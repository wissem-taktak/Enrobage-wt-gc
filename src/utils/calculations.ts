interface ExposureClassData {
  [key: string]: {
    description: string;
    baseStructuralClass: number;
    cmindur: (structuralClass: number) => number;
  };
}

const exposureClassesData: ExposureClassData = {
  'X0': {
    description: 'Aucun risque de corrosion',
    baseStructuralClass: 1,
    cmindur: (s) => 10
  },
  'XC1': {
    description: 'Sec ou humide en permanence',
    baseStructuralClass: 4,
    cmindur: (s) => 10 + (s - 4) * 5
  },
  'XC2': {
    description: 'Humide, rarement sec',
    baseStructuralClass: 4,
    cmindur: (s) => 20 + (s - 4) * 5
  },
  'XC3': {
    description: 'Humidité modérée',
    baseStructuralClass: 4,
    cmindur: (s) => 20 + (s - 4) * 5
  },
  'XC4': {
    description: 'Alternance humide/sec',
    baseStructuralClass: 4,
    cmindur: (s) => 25 + (s - 4) * 5
  },
  'XD1': {
    description: 'Humidité modérée + chlorures',
    baseStructuralClass: 4,
    cmindur: (s) => 30 + (s - 4) * 5
  },
  'XD2': {
    description: 'Humide + chlorures',
    baseStructuralClass: 4,
    cmindur: (s) => 35 + (s - 4) * 5
  },
  'XD3': {
    description: 'Alternance humide/sec + chlorures',
    baseStructuralClass: 4,
    cmindur: (s) => 40 + (s - 4) * 5
  }
};

const getStrengthClassModification = (concreteClass: string): number => {
  const strength = parseInt(concreteClass.split('/')[0].substring(1));
  if (strength >= 40) return -1;
  if (strength <= 25) return 1;
  return 0;
};

const getCementTypeModification = (cementType: string): number => {
  switch (cementType) {
    case 'CEM-I':
      return 0;
    case 'CEM-II/A':
      return 0;
    case 'CEM-II/B':
      return 1;
    case 'CEM-III/A':
      return -1;
    case 'CEM-III/B':
      return -2;
    case 'CEM-IV/A':
      return 0;
    case 'CEM-IV/B':
      return 1;
    case 'CEM-V/A':
      return -1;
    case 'CEM-V/B':
      return -1;
    default:
      return 0;
  }
};

export const calculateBaelCover = (
  environment: string,
  crackType: string,
  barDiameter: number
): { cover: number; details: string[] } => {
  const details: string[] = [];
  let baseCover: number;

  // Calcul selon A.7.1 BAEL 91 modifié 99
  if (environment === 'maritime') {
    baseCover = 50;
    details.push('§ A.7.1 BAEL 91 : Ouvrage à la mer, exposé aux embruns ou brouillards salins');
    details.push('Enrobage minimal = 50mm pour les ouvrages maritimes ou très agressifs');
  } else if (environment === 'aggressive') {
    baseCover = 30;
    details.push('§ A.7.1 BAEL 91 : Paroi soumise aux actions agressives, intempéries ou condensations');
    details.push('Enrobage minimal = 30mm pour les environnements agressifs');
  } else if (environment === 'protected') {
    baseCover = 10;
    details.push('§ A.7.1 BAEL 91 : Paroi en local couvert et clos, non exposée aux condensations');
    details.push('Enrobage minimal = 10mm pour les environnements protégés');
  }

  // Vérification supplémentaire avec le diamètre des armatures
  const minCoverByDiameter = Math.max(barDiameter, 10);
  if (minCoverByDiameter > baseCover) {
    baseCover = minCoverByDiameter;
    details.push(`Enrobage augmenté à ${baseCover}mm pour respecter le diamètre des armatures`);
  }

  // Majoration selon le type de fissuration
  if (crackType === 'prejudicial') {
    const majoredCover = Math.max(baseCover * 1.5, baseCover + 10);
    details.push(`Majoration pour fissuration préjudiciable: ${majoredCover}mm`);
    baseCover = majoredCover;
  } else if (crackType === 'veryPrejudicial') {
    const majoredCover = Math.max(baseCover * 2, baseCover + 20);
    details.push(`Majoration pour fissuration très préjudiciable: ${majoredCover}mm`);
    baseCover = majoredCover;
  }

  return { cover: baseCover, details };
};

export const calculateEc2Cover = (
  exposureClass: string,
  barDiameter: number,
  concreteClass: string,
  designWorkingLife: number,
  compactCover: boolean,
  cementType: string
): { cover: number; details: string[] } => {
  const details: string[] = [];
  
  const { baseStructuralClass, description } = exposureClassesData[exposureClass];
  let structuralClass = baseStructuralClass;
  
  const workingLifeModification = designWorkingLife >= 100 ? 2 : 0;
  details.push(`§ 4.4.1.2 EC2 : Durée d'utilisation de projet ${designWorkingLife} ans (Δclasse = ${workingLifeModification})`);
  
  const strengthModification = getStrengthClassModification(concreteClass);
  details.push(`Classe de résistance ${concreteClass} (Δclasse = ${strengthModification})`);
  
  const cementModification = getCementTypeModification(cementType);
  details.push(`Type de ciment ${cementType} (Δclasse = ${cementModification})`);
  
  const compactModification = compactCover ? -1 : 0;
  details.push(`Enrobage compact : ${compactCover ? 'Oui' : 'Non'} (Δclasse = ${compactModification})`);
  
  structuralClass += workingLifeModification + strengthModification + cementModification + compactModification;
  structuralClass = Math.max(1, Math.min(6, structuralClass));
  details.push(`Classe structurale finale : S${structuralClass}`);
  
  const cminb = barDiameter;
  details.push(`§ 4.4.1.2 EC2 : cmin,b = Φ = ${cminb}mm`);

  const cmindur = exposureClassesData[exposureClass].cmindur(structuralClass);
  details.push(`§ 4.4.1.2 EC2 : Classe d'exposition ${exposureClass} - ${description}`);
  details.push(`cmin,dur = ${cmindur}mm (pour classe structurale S${structuralClass})`);

  const cmin = Math.max(cminb, cmindur);
  const cover = cmin + 10;
  details.push(`§ 4.4.1.3 EC2 : cnom = max(cmin,b, cmin,dur) + Δcdev`);
  details.push(`cnom = max(${cminb}, ${cmindur}) + 10 = ${cover}mm`);

  return { cover, details };
};
export const getEmptyFields = (values) => {
  
  const requiredFields = [
    'No',
    'BollectarioNo',
    'Tirsi',
    'BolletaNo',
    'Taariikh',
    'Xaafadda',
    'vacant1',
    'vacant2',
    'mudMar',
    'X',
    'kunaYaal',
    'Degmada',
    'SoohdintiisuTahay',
    'Waqooyi',
    'Galbeed',
    'Bari',
    'kofuur',
    'lacagNo',
    'ee',
    'Agaasimaha',
    'Duqa'
  ];

  // Filter the required fields that are empty
  const emptyFields = requiredFields.filter((fieldName) => values[fieldName].trim() === '');

  return emptyFields;
};

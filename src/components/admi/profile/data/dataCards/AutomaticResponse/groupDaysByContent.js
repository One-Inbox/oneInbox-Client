// Agrupado por patrón dentro de cada día: Un patrón se define por la combinación de startHour, endHour y message.
// Para cada día (0 a 6) busca las redes sociales que tengan ese patrón y agrupa sus socialMediaId (IDs de redes sociales) juntos.
// Agrupado final por redes sociales: Toma todos los grupos del paso anterior y los reorganiza para que cada grupo contenga todas las coincidencias de días y patrones que tienen exactamente las mismas redes sociales.
// El resultado final es un arreglo donde cada elemento representa: Un conjunto fijo de redes sociales (socialMedia) + Una lista de subgrupos con el patrón (startHour, endHour, message), los días donde ese patrón se repite en esas redesy los ids de las redes sociales activas de ese grupo

const groupDaysByContent = (automaticResponseActive) => {
  const groups = {};

  // PRIMER AGRUPADO (por patrón + red social)
  for (let day = 0; day <= 6; day++) {
    const patterns = {};

    automaticResponseActive.forEach((social) => {
      const d = social.automaticResponse.detail.find((det) => det.day === day);
      if (!d) return;

      const key = `${d.startHour}-${d.endHour}-${d.message}`;

      if (!patterns[key]) {
        patterns[key] = {
          day,
          pattern: {
            startHour: d.startHour,
            endHour: d.endHour,
            message: d.message,
          },
          socialMedia: [],
          socialMediaActiveIds: [],
        };
      }

      patterns[key].socialMedia.push(social.SocialMedia[0].name);
      patterns[key].socialMediaActiveIds.push(social.id);
    });

    // Agrupamos en groups
    Object.values(patterns).forEach((group) => {
      const socialMediaKey = group.socialMedia
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .join(",");
      const finalKey = `${group.pattern.startHour}-${group.pattern.endHour}-${group.pattern.message}-${socialMediaKey}`;

      if (!groups[finalKey]) {
        groups[finalKey] = {
          pattern: group.pattern,
          socialMedia: group.socialMedia
            .slice()
            .sort((a, b) => a.localeCompare(b)),
          socialMediaActiveIds: group.socialMediaActiveIds.slice(),
          days: [],
        };
      } else {
        // Si el grupo ya existe, agregamos los IDs que no estén ya incluidos
        group.socialMediaActiveIds.forEach((id) => {
          if (!groups[finalKey].socialMediaActiveIds.includes(id)) {
            groups[finalKey].socialMediaActiveIds.push(id);
          }
        });
      }

      groups[finalKey].days.push(group.day);
    });
  }

  const firstResult = Object.values(groups);

  // SEGUNDO AGRUPADO (por socialMedia iguales)
  const groupedBySocialMedia = {};

  firstResult.forEach((grp) => {
    const socialMediaKey = grp.socialMedia.join(",");
    if (!groupedBySocialMedia[socialMediaKey]) {
      groupedBySocialMedia[socialMediaKey] = {
        socialMedia: grp.socialMedia,
        subgroups: [],
      };
    }

    groupedBySocialMedia[socialMediaKey].subgroups.push({
      pattern: grp.pattern,
      days: grp.days,
      socialMediaActiveIds: grp.socialMediaActiveIds,
    });
  });

  return Object.values(groupedBySocialMedia);
};

export default groupDaysByContent;

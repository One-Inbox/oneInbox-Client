import socialMediaJson from "../../../../../public/json/socialMediaJson";

const getSocialMediaName = (socialMedia) => {
  if (!socialMedia || !Array.isArray(socialMedia))
    throw new Error("Invalid social media data");
  const socialMediaNames = socialMedia.map((sm) => {
    const smfind = socialMediaJson.find((s) => s.id === sm.socialMediaId);
    return smfind ? { id: sm.socialMediaId, name: smfind.name } : null; // si no encuentra, devuelve null
  });
  return socialMediaNames.sort((a, b) => a.name.localeCompare(b.name)); // filtra los nulos
};
export default getSocialMediaName;

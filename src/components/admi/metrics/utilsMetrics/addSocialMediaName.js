import socialMediaJson from "../../../../../public/json/socialMediaJson";

const addSocialMediaName = (data) => {
  if (!data || !Array.isArray(data)) throw new Error("Invalid data");

  return data.map((item) => {
    const smfind = socialMediaJson.find((s) => s.id === item.socialMediaId);
    return {
      ...item, // Mantiene afterTime, beforeTime, onTime, socialMediaId, etc.
      name: smfind ? smfind.name : `Unknown (${item.socialMediaId})`,
    };
  });
};
export default addSocialMediaName;

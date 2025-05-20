import React from "react";
import { useSelector } from "react-redux";
import SocialMediaIcons from "../../../../utils/icons/socialMediaIcons";

const SocialMediaData = () => {
  const business = useSelector((state) => state.business);
  const socialMediabyRedux = useSelector((state) => state.socialMedia);
  // Recuperar y parsear datos del sessionStorage
  const socialMediabyStorage = sessionStorage.getItem('SocialMedia');
  const parsedSocialMedia = socialMediabyStorage
    ? JSON.parse(socialMediabyStorage)
    : [];

  // Usar datos de Redux si están disponibles, de lo contrario usar sessionStorage
  const socialMedia =
    socialMediabyRedux && socialMediabyRedux.length > 0
      ? socialMediabyRedux
      : parsedSocialMedia;
  //console.log("redes sociales", socialMedia);
  const socialMediaUserNotNull = socialMedia.filter(
    (sm) => sm.dataUser !== "null"
  );
  //console.log("socialMediaUserNotNull", socialMediaUserNotNull);

  const socialMediaNotNull = socialMediaUserNotNull.filter(
    (sm) => sm.SocialMedia.length >= 1
  );
  console.log("socialMediaNotNull", socialMediaNotNull);
  const socialMediaSortered = socialMediaNotNull
    ? socialMediaNotNull.sort((a, b) => {
        return a.SocialMedia[0].name.localeCompare(b.SocialMedia[0].name);
      })
    : socialMediaNotNull;
  //console.log("sortered", socialMediaSortered);

  const half = Math.ceil(socialMediaSortered.length / 2);
  const groupA =
    socialMedia.length > 1
      ? socialMediaSortered.slice(0, half)
      : socialMediaSortered;

  const groupB =
    socialMedia.length > 1 ? socialMediaSortered.slice(half) : false;
  // console.log("grupoA", groupA);
  // console.log("grupoB", groupB);

  return (
    <div className="w-[48.5rem] h-auto bg-neutral-200 rounded-br-[50px] rounded-tr-[50px] rounded-bl-[50px] relative">
      <div className="flex flex-col items-center pt-6 mt-2">
        <h1 className="text-base font-normal font-['Oswald'] uppercase">
          plataforma redes sociales
        </h1>
      </div>
      {!socialMedia.length ? (
        <div className="flex flex-col items-center my-6 pb-6">
          <p className="text-sm font-normal font-['Inter'] ">
            Aún no hay Redes Sociales activas en {business.name}
          </p>
        </div>
      ) : !groupB ? (
        <div>
          {socialMedia.map((sm, index) => (
            <div className="flex flex-row mt-2" key={index}>
              <div className="w-8 h-8">
                <SocialMediaIcons
                  socialMedia={
                    sm.SocialMedia.length &&
                    sm.socialMedia[0] &&
                    sm.SocialMedia[0].name
                      ? sm.SocialMedia[0].name.toUpperCase()
                      : "RED SOCIAL"
                  }
                />
              </div>
              <h4 className="text-sm font-normal font-['Oswald'] uppercase ml-2 mt-2">
                {!sm.SocialMedia.length
                  ? "red social"
                  : sm.SocialMedia.map((e) => e.name)}
              </h4>
              <span className="text-sm font-normal font-['Inter'] ml-2 mt-2">
                {sm.dataUser}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row justify-between px-12 mt-6">
          <div className="flex flex-col mb-12">
            {groupA &&
              groupA.map((sm, index) => (
                <div className="flex flex-row mt-2" key={index}>
                  <div className="w-8 h-8">
                    <SocialMediaIcons
                      socialMedia={
                        !sm.SocialMedia.length
                          ? "red social"
                          : sm.SocialMedia.map((e) => {
                              return e.name.toUpperCase();
                            })
                      }
                    />
                  </div>

                  <h4 className="text-sm font-normal font-['Oswald'] uppercase ml-2 mt-2">
                    {!sm.SocialMedia.length
                      ? "red social"
                      : sm.SocialMedia.map((e) => e.name)}
                  </h4>
                  <span className="text-sm font-normal font-['Inter'] ml-2 mt-2">
                    {sm.dataUser}
                  </span>
                </div>
              ))}
          </div>
          <div className="flex flex-col px-12 mb-12">
            {groupB &&
              groupB.map((sm, index) => (
                <div className="flex flex-row mt-2" key={index}>
                  <div className="w-8 h-8">
                    <SocialMediaIcons
                      socialMedia={
                        !sm.SocialMedia.length
                          ? "red social"
                          : sm.SocialMedia.map((e) => {
                              return e.name.toUpperCase();
                            })
                      }
                    />
                  </div>
                  <h4 className="text-sm font-normal font-['Oswald'] uppercase ml-2 mt-2">
                    {!sm.SocialMedia.length
                      ? "red social"
                      : sm.SocialMedia.map((e) => e.name)}
                  </h4>
                  <span className="text-sm font-normal font-['Inter'] ml-2 mt-2">
                    {sm.dataUser}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaData;

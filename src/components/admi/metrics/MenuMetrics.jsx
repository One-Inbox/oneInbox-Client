import MenuButtonMetrics from "./MenuButtonMetrics";
const MenuMetrics = () => {
  return (
    <div className="sticky w-56 h-screen overflow-y-auto overflow-x-hidden bg-green-400 flex flex-col items-center justify-center">
      <MenuButtonMetrics nameRoute={"Ranking de Redes Sociales"} />
      <MenuButtonMetrics nameRoute={"Actividad Horaria"} />
      <MenuButtonMetrics nameRoute={"Ranking de Usuarios"} />
      <MenuButtonMetrics nameRoute={"Tiempos de Respuesta"} />
    </div>
  );
};
export default MenuMetrics;

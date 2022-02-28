import { useContext } from 'react';
import { GiLightSabers } from 'react-icons/gi';
import RequisitionContext from '../Context/RequisitionContext';

export default function LoadingOrErrorAPI() {
  const { data } = useContext(RequisitionContext);

  const RenderLightSabers = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'yellow'];
    return colors
      .map((color) => <GiLightSabers style={{ width: '100px', height: '100px', color }} />)
  };

  if (data.length < 1) return (
    <div>
      <p>
        Carregando...
      </p>
      <RenderLightSabers />
    </div>
  );

  if (data[0] === 'Erro') return <p>Erro ao buscar os dados. Tente novamente mais tarde.</p>

  return null;

}
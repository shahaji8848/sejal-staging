import { useRouter } from 'next/router';
import MaterialMaster from '../Material/MaterialMaster';
import MaterialGroupMaster from '../MaterialGroup/MaterialGroupMaster';

const MaterialIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];
  return (
    <div>
      {key === 'material-group' && (
        <MaterialGroupMaster />
      )}
      {key === 'material' && (
        <MaterialMaster />

      )}
    </div>
  );
};

export default MaterialIndexPage;

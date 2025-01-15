import { useRouter } from 'next/router';
import KarigarMaster from '../Karigar/KarigarMaster';
import KundanKarigarMaster from '../KundanKarigar/KundanKarigarMaster';

const IndexPage = () => {

  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];

  return (
    <div>
      {key === 'karigar' && (
        <KarigarMaster />
      )}
      {key === 'kundan-karigar' && (
        <KundanKarigarMaster />
      )}
    </div>
  );
};

export default IndexPage;

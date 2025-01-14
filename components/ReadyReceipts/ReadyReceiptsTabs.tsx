import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/header.module.css';

const ReadyReceiptsTabs: any = () => {
  const router = useRouter();

  const pathcontent = router?.asPath?.split('/');

  const KundanValue =
    (pathcontent?.length > 0 &&
      pathcontent !== null &&
      pathcontent?.includes('kundan')) ||
    pathcontent?.includes('Kundan');
  const mangalsutraValue =
    pathcontent?.length > 0 &&
    pathcontent !== null &&
    (pathcontent?.includes('mangalsutra') ||
      pathcontent?.includes('Mangalsutra'));

  return (
    <div className=" justify-content-center">
      <div className="navbar d-flex justify-content-center p-0">
        <div>
          <div className="d-flex justify-content-center">
            <Link
              href="/readyReceipt/kundan"
              className="text-decoration-none btn-margin"
            >
              <button
                className={`${styles.button} ${
                  KundanValue ? 'activeColor' : ''
                }`}
              >
                Ready Receipts (Kundan Karigar)
                <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
              </button>
            </Link>
            <Link
              href="/readyReceipt/mangalsutra"
              className="text-decoration-none btn-margin"
            >
              <button
                className={`${styles.button} ${
                  mangalsutraValue ? 'activeColor' : ''
                } `}
              >
                Ready Receipts (Mangalsutra Karigar)
                <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyReceiptsTabs;

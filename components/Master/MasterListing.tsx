import Link from 'next/link';
import styles from '../../styles/header.module.css';
import styled from '../../styles/master.module.css';
import { useMasterListingHook } from '@/hooks/master/master-listing-hook';

const MasterListing: any = ({ value }: any) => {
  useMasterListingHook();
  return (
    <div>
      <div className="container-lg p-0">
        <div className="d-flex flex-wrap justify-content-center">
          <Link href="/master/karigar" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'karigar' ? 'activeColor' : ''
                }`}
            >
              Karigar
              <i className="fa-solid fa-arrow-turn-down mx-1  pt-1"></i>
            </button>
          </Link>
          <Link href="/master/kundan-karigar" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'kundan-karigar' ? 'activeColor' : ''
                }`}
            >
              Kundan Karigar
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/material-group" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'material-group' ? 'activeColor' : ''
                }`}
            >
              Material Group
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/material" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'material' ? 'activeColor' : ''
                }`}
            >
              Material
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/client-group" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'client-group' ? 'activeColor' : ''
                }`}
            >
              Client Group
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>

          <Link href="/master/client" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'client' ? 'activeColor' : ''
                }`}
            >
              Client
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/sales-group" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'sales-group' ? 'activeColor' : ''
                }`}
            >
              Sales Group
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>

          <Link href="/master/kun-category" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'kun-category' ? 'activeColor' : ''
                }`}
            >
              Kun-Category
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/cs-category" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'cs-category' ? 'activeColor' : ''
                }`}
            >
              CS-Category
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/ot-category" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'ot-category' ? 'activeColor' : ''
                }`}
            >
              OT-Category
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>

          <Link href="/master/BBCategory" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'BBCategory' ? 'activeColor' : ''
                }`}
            >
              BB-Category
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/category" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'category' ? 'activeColor' : ''
                }`}
            >
              Category
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link href="/master/sub-category" className="text-decoration-none ">
            <button
              className={`${styles.button} ${styled.master_btn} ${value === 'sub-category' ? 'activeColor' : ''
                }`}
            >
              Sub-Category & Code
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterListing;

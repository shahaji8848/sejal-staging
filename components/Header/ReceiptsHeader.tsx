import { useEffect, useState } from 'react';
import styles from '../../styles/header.module.css';
import { useRouter } from 'next/router';

const ReceiptsHeader = () => {
  const router = useRouter();
  const pathParts = router.asPath.split('/');
  const url1 = pathParts[pathParts.length - 1];
  const url2 = pathParts[pathParts.length - 2];
  const headerData: any = [
    { label: 'Master', href: '/master/karigar' },
    { label: 'Ready Receipts', href: '/readyReceipt/kundan' },
    { label: 'Sales', href: '/sales/customerSale' },
    { label: 'Report', href: '/report/daily-qty-status' },
    { label: 'Barcode', href: '/barcode' },
  ];

  const currentActivePageInitially: any = () => {
    const currentPage: any = headerData.filter((data: any, index: any) => {
      return data.href.includes(url1) || data.href.includes(url2);
    });
    return currentPage[0]?.label;
  };

  const [activeItem, setActiveItem] = useState(currentActivePageInitially());

  useEffect(() => {
    currentActivePageInitially();
  }, [router]);

  const handleItemClick = (value: any) => {
    setActiveItem(value);
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {headerData.map((item: any, index: any) => (
        <div key={index} className="btn-margin">
          <button
            className={`${styles.button} ${
              activeItem === item.label ? 'activeColor' : ''
            }`}
            onClick={() => {
              handleItemClick(item.label);
              router.push(item.href);
            }}
          >
            <i
              className="fa-regular fa-file icons-color mr-2"
              style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
            ></i>
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceiptsHeader;

import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/header.module.css';
import styled from '../../styles/report.module.css';

const ReportHeader = () => {
  const { query } = useRouter();
  return (
    <div className="d-flex justify-content-center flex-wrap">
      <Link
        href="/report/daily-qty-status"
        className="text-decoration-none btn-margin "
      >
        <button
          className={`${styles.button} ${styled.report_header_btn} ${
            query?.reportId === 'daily-qty-status' ? 'activeColor' : ''
          }`}
        >
          Daily Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/product-code"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${styled.report_header_btn} ${
            query?.reportId === 'product-code' ? 'activeColor' : ''
          }`}
        >
          Product Code
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>

      <Link
        href="/report/detailed-summary-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${styled.report_header_btn} ${
            query?.reportId === 'detailed-summary-report' ? 'activeColor' : ''
          }`}
        >
          Detailed Summary Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/customer-wise-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${styled.report_header_btn} ${
            query?.reportId === 'customer-wise-report' ? 'activeColor' : ''
          }`}
        >
          Customer Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/karigar-wise-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${styled.report_header_btn} ${
            query?.reportId === 'karigar-wise-report' ? 'activeColor' : ''
          }`}
        >
          Karigar Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>

      <Link
        href="/report/summary-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${styled.report_header_btn} ${
            query?.reportId === 'summary-report' ? 'activeColor' : ''
          }`}
        >
          Summary Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/ready-stock-summary-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${styled.report_header_btn} ${
            query?.reportId === 'ready-stock-summary-report'
              ? 'activeColor'
              : ''
          }`}
        >
          Ready Stock Summary Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
    </div>
  );
};

export default ReportHeader;

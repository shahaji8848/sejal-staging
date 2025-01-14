import Image from 'next/image';
import React from 'react';
import noRecordImg from '../../public/assets/no-record-img.jpg';
import { useRouter } from 'next/router';

const NoRecord = ({ title, content, backButtonUrl, HandleRefresh }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <div className="text-center">
            <Image
              src={noRecordImg}
              width={250}
              height={200}
              alt="Picture of no record"
              className="text-center"
            />
          </div>
          <h3 className="text-center mt-1">{title || 'No Records Found'}</h3>
          <p className="text-center fs-5 mt-3">
            {content ||
              "It looks like we don't have any items that match your search."}
          </p>
          <div className="text-center">
            {backButtonUrl ? (
              <button
                type="button"
                onClick={() => router?.push(backButtonUrl)}
                className="btn btn-primary px-2"
              >
                Go Back
              </button>
            ) : (
              // <button
              //   type="button"
              //   onClick={HandleRefresh}
              //   className="btn btn-primary px-2"
              // >
              //   Refresh
              // </button>
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRecord;

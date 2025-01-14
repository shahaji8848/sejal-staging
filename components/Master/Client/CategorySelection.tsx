import React from 'react';
import { useSelector } from 'react-redux';
import { get_bb_category_data } from '@/store/slices/Master/get-bb-category-slice';
import { get_cs_category_data } from '@/store/slices/Master/get-cs-category-slice';
import { get_kun_category_data } from '@/store/slices/Master/get-kun-category-slice';
import { get_ot_category_data } from '@/store/slices/Master/get-ot-category-slice';

const CategorySelection = ({ handleNameChange, inputValue }: any) => {
  let kunCategory = useSelector(get_kun_category_data)?.data;
  let bbCategory = useSelector(get_bb_category_data)?.data;
  let csCategory = useSelector(get_cs_category_data)?.data;
  let otCategory = useSelector(get_ot_category_data)?.data;

  return (
    <>
      <div className="">
        <div className="row mt-2 justify-content-end">
          <div className="col-lg-6">
            <label htmlFor="">Kun Category</label>
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              id="kundan_category"
              name="kundan_category"
              onChange={(e: any) => {
                const { name, value } = e.target
                handleNameChange(value, name);
              }}
              value={inputValue?.kundan_category}

            >
              <option selected>Select Kun Category</option>
              {kunCategory?.length > 0 &&
                kunCategory.map((category: any, index: any) => (
                  <option value={category.name1} defaultValue={inputValue?.kundan_category} key={index}>
                    {category.name1}
                  </option>
                ))}
            </select>

            <label htmlFor="" className="mt-3">
              CS Category
            </label>
            <select
              className="form-select form-select-sm "
              aria-label=".form-select-sm example"
              id="cs_category"
              name="cs_category"
              onChange={(e) => {
                const { name, value } = e.target
                handleNameChange(value, name);
              }}
              value={inputValue?.cs_category}
            >
              <option selected>Select CS Category</option>
              {csCategory?.length > 0 &&
                csCategory.map((category: any, index: any) => (
                  <option value={category.name1} defaultValue={inputValue?.cs_category} key={index}>
                    {category.name1}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-6">
            <label htmlFor="">OT Category</label>
            <select
              className="form-select form-select-sm "
              aria-label=".form-select-sm example"
              id="ot_category"
              name="ot_category"
              onChange={(e) => {
                const { name, value } = e.target
                handleNameChange(value, name);
              }}
              value={inputValue?.ot_category}
            >
              <option selected>Select OT Category</option>
              {otCategory?.length > 0 &&
                otCategory.map((category: any, index: any) => (
                  <option value={category.name1} defaultValue={inputValue?.ot_category} key={index}>
                    {category.name1}
                  </option>
                ))}
            </select>

            <label htmlFor="" className="mt-3">
              BB Category
            </label>
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              id="bb_category"
              name="bb_category"
              onChange={(e) => {
                const { name, value } = e.target
                handleNameChange(value, name);
              }}
              value={inputValue?.bb_category}
            >
              <option selected>Select BB Category</option>
              {bbCategory?.length > 0 &&
                bbCategory.map((category: any, index: any) => (
                  <option value={category.name1} defaultValue={inputValue?.bb_category} key={index}>
                    {category.name1}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySelection;

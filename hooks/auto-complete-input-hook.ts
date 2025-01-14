import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const useAutoCompleteInputHook = ({
  data,
  handleSearchInput,
  setStateForDocStatus,
  readOnlyFields,
}: any) => {
  const { query } = useRouter();
  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  const [showClientGroupSelect, setShowClientGroupSelect] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      // Check if the input element itself or the client group select dropdown was clicked
      const isSelectClicked =
        e.target.tagName === 'SELECT' &&
        e.target.classList.contains('form-select');

      if (
        e?.target !== inputRef?.current &&
        !inputRef?.current?.contains(e.target) &&
        !dropdownRef?.current?.contains(e.target) &&
        !isSelectClicked
      ) {
        setShowDropdown(false);
      }
    };
    const handleKeyDropdown = (e: any) => {
      // Check if a key other than arrow keys or Enter key was pressed
      if (![37, 38, 39, 40, 13].includes(e.keyCode)) {
        setShowDropdown(false);
      }
    };

    const handleClientGroupDropdownClick = (e: any) => {
      // Stop event propagation for client group dropdown
      e.stopPropagation();
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDropdown);

    document
      .querySelector('.form-select.form-select-sm.border')
      ?.addEventListener('click', handleClientGroupDropdownClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document
        .querySelector('.form-select.form-select-sm.border')
        ?.removeEventListener('click', handleClientGroupDropdownClick);
      document.removeEventListener('keydown', handleKeyDropdown);
    };
  }, [inputRef]);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const selectedItem = dropdownRef.current.childNodes[
        selectedIndex
      ] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, showDropdown]);

  const handleShowDropdown = () => {
    if (!readOnlyFields) {
      setShowDropdown(!showDropdown);
      setSelectedIndex(-1);
      const dropdownData: any =
        data?.link_data?.length > 0 && data?.link_data.map((item: any) => item);
      setFilterDropdownList(dropdownData);
      // setSelectDropDownReset(false);
    }
  };

  const handleSelectedOption = (data: any, i: any, fieldname: any) => {
    handleSearchInput(data, fieldname);
    setShowDropdown(false);
    setSelectedIndex(i !== undefined ? i : -1);
    inputRef.current.value = data; // Set the selected value in the input field

    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
  };

  // Use useEffect to reset the input value when the query changes
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  }, [query]);

  const handleFieldChange = (e: any, fieldname: any) => {
    handleSearchInput(e.target.value, fieldname);
    setShowDropdown(true);
    const query = e.target.value;
    const updatedFilterList: any =
      data?.link_data?.length > 0 &&
      data?.link_data?.filter((item: any) => {
        return item?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1;
      });

    setFilterDropdownList(updatedFilterList);
    setNoRecordsFound(true);
    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
    if (updatedFilterList?.length === 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
    handleKeyDown(e, fieldname);
  };

  const handleKeyDown = (e: any, fieldname: any) => {
    if (!readOnlyFields) {
      if (e.key === 'ArrowDown' && !showDropdown) {
        e.preventDefault();
        setShowDropdown(true);
        setSelectedIndex(-1);
      } else if (e.key === 'ArrowDown' && showDropdown) {
        setSelectedIndex((prevIndex: any) =>
          prevIndex < filterDropdownList?.length - 1 ? prevIndex + 1 : prevIndex
        );
        setScrollIndex((prevScrollIndex: any) =>
          Math.min(prevScrollIndex + 1, filterDropdownList?.length - 1)
        );
      } else if (e.key === 'ArrowUp' && showDropdown) {
        e.preventDefault();
        setSelectedIndex((prevIndex: any) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
        setScrollIndex((prevScrollIndex: any) =>
          Math.max(prevScrollIndex - 1, 0)
        );
      } else if (
        (e.key === 'Enter' || e.keyCode === 13) &&
        showDropdown &&
        selectedIndex !== -1
      ) {
        e.preventDefault();
        handleSelectedOption(
          filterDropdownList[selectedIndex],
          selectedIndex,
          fieldname
        );
      } else if (
        (e.key === 'Enter' || e.keyCode === 13) &&
        showDropdown &&
        filterDropdownList?.length === 1
      ) {
        e.preventDefault();
        handleSelectedOption(filterDropdownList[0], 0, fieldname);
      }
    }
  };

  const handleDocumentClick = (e: any) => {
    if (
      e?.target !== inputRef?.current &&
      !inputRef?.current?.contains(e?.target)
    ) {
      setShowDropdown(true);
    }
  };
  const handleShowClientGroupSelect = (
    e: React.MouseEvent<HTMLSelectElement>
  ) => {
    e.stopPropagation(); // Stop event propagation
    setShowClientGroupSelect(!showClientGroupSelect);
    setShowDropdown(true);
  };

  const handleClientBlur = () => {
    if (!document.activeElement?.classList.contains('form-select')) {
      if (filterDropdownList?.length === 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }
  };
  return {
    handleShowDropdown,
    handleSelectedOption,
    handleFieldChange,
    handleKeyDown,
    handleDocumentClick,
    handleShowClientGroupSelect,
    handleClientBlur,
    showDropdown,
    selectedIndex,
    noRecords,
    filterDropdownList,
    showClientGroupSelect,
    inputRef,
    dropdownRef,
  };
};

export default useAutoCompleteInputHook;

import React from 'react';

const MasterFilters = ({ headers, filters, onFiltersChange }: any) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, header: string) => {
        const updatedFilters = {
            ...filters,
            [header]: e.target.value,
        };
        onFiltersChange(updatedFilters);
    };

    const capitalizeWords = (str: string) => {
        return str
            .replace(/_/g, ' ') // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
    };
    return (
        <div className="row mb-1">
            {headers?.length > 0 && headers.map((header: any) => (
                <div key={header} className="col me-1 mt-1">
                    <label className="form-label my-0 " style={{ fontSize: "14px" }}>{capitalizeWords(header)}</label>
                    <input
                        type="text"
                        className="form-control p-1 "
                        value={filters[header] || ''}
                        onChange={(e) => handleInputChange(e, header)}
                        placeholder={`${capitalizeWords(header)}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default MasterFilters;

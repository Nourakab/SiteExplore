interface CountryFilterProps {
  selectedCountries: string[];
  handleCountrySelect: (country: string) => void;
  removeSelectedCountry: (country: string) => void;
  allCountries: string[];
}

function CountryFilter({
  selectedCountries,
  handleCountrySelect,
  removeSelectedCountry,
  allCountries,
}: CountryFilterProps) {
  return (
    <>
      <div className="country-dropdown-toggle">
        {selectedCountries.length > 0 ? (
          <div className="selected-countries-preview">
            {selectedCountries.map((country) => (
              <span key={country} className="country-badge">
                {country}{' '}
                <button onClick={() => removeSelectedCountry(country)}>
                  x
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p>Select Country</p>
        )}
      </div>

      <div className="expandable-country-list">
        {allCountries
          .sort((a, b) => a.localeCompare(b))
          .map((country) => (
            <div
              key={country}
              className={`country-item ${
                selectedCountries.includes(country) ? 'selected' : ''
              }`}
              onClick={() => handleCountrySelect(country)}
            >
              {selectedCountries.includes(country) && <span>✔</span>}
              {country}
            </div>
          ))}
      </div>
    </>
  );
}

export default CountryFilter;

import {
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import citiesList from "@/lib/cities-list";

interface LocationInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInputSearch({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => {
          return `${city.name}, ${city.subcountry}, ${city.country}`;
        })
        .filter((city) => {
          return (
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) => {
              return city.toLowerCase().includes(word.toLowerCase());
            })
          );
        })
        .slice(0, 5);
    }, [locationSearchInput]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        setHasFocus(false);
      } else if (event.key !== "Escape") {
        setHasFocus(true);
      }
    };

    return (
      <div className="relative">
        <Input
          autoComplete="off"
          placeholder="Start typing the name of the city"
          type="search"
          {...props}
          ref={ref}
          value={locationSearchInput}
          onChange={(event) => {
            setLocationSearchInput(event.target.value);
          }}
          onFocus={() => {
            setHasFocus(true);
          }}
          onBlur={() => {
            setHasFocus(false);
          }}
          onKeyDown={handleKeyDown}
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => {
              return (
                <button
                  key={city}
                  className="block w-full p-1 text-start transition hover:bg-muted"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onLocationSelected(city);
                    setLocationSearchInput("");
                  }}
                >
                  {city}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

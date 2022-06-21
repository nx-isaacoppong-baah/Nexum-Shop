import React from 'react';
import type { FC } from 'react';
import { Select, Stack } from '@chakra-ui/react';
import ReactCountryFlag from "react-country-flag";
import { Factory } from "~/scripts/factories";
import type { CountrySelectorProps } from '~/types';

export const CountrySelector: FC<CountrySelectorProps> = ({ selectedLocale, rendered }
: CountrySelectorProps): JSX.Element => {
	return(
		<Stack spacing={4}>
			{
				rendered && !selectedLocale &&
				<Select onChange = { Factory.cookieStorage().setCurrentLocaleAndRedirect } size="md">
					<option value=""> Default </option>
					<option value="en-us"> <ReactCountryFlag countryCode="US" /> English </option>
					<option value="de-de"> <ReactCountryFlag countryCode="DE" /> German </option>
				</Select>
			}
			{
				(rendered && selectedLocale === "en-us") &&
				<Select onChange = { Factory.cookieStorage().setCurrentLocaleAndRedirect } size="md">
					<option value="en-us"> <ReactCountryFlag countryCode="US" /> English </option>
					<option value="de-de"> <ReactCountryFlag countryCode="DE" /> German </option>
					<option value=""> Default </option>
				</Select>
			}
									{
				(rendered && selectedLocale === "de-de") &&
				<Select onChange = { Factory.cookieStorage().setCurrentLocaleAndRedirect } size="md">
					<option value="de-de"> <ReactCountryFlag countryCode="DE" /> German </option>
					<option value="en-us"> <ReactCountryFlag countryCode="US" /> English </option>
					<option value=""> Default </option>
				</Select>
			}
		</Stack>
	)
}

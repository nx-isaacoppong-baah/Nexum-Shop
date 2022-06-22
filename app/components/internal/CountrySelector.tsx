import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Select, Stack } from "@chakra-ui/react";
import ReactCountryFlag from "react-country-flag";
import { useLoaderData } from "@remix-run/react";

import type { PageResponseData } from "~/types";
import { Languages } from "~/enums";
import Factory from "~/scripts/factories/home";
import CookieUtilities from "~/scripts/services/cookies";
import constants from "~/scripts/factories/constants";
import algorithms from "~/scripts/utils/algorithms";

export const CountrySelector: FC = (): JSX.Element => {
	let { space } = useLoaderData<PageResponseData>();
	const languages = space.languages;
	const languagesCodes = space.language_codes as string[];

	const [languageSelected, setLanguage] = useState("");
	const [rendered, isRendered] = useState(false);

	useEffect(() => {
		const cookieUtilities = new CookieUtilities();
		const locale = cookieUtilities.getValue(constants.locale);

		if (locale) {
			setLanguage(locale);
		}

		isRendered(true);
	}, [])

	return(
		<Stack spacing={4}>				
			<Select defaultValue={Languages.default} onChange = { Factory.browserCookies().setCurrentLocaleAndRedirect.bind(this, languagesCodes) } size="md">
				{
					languagesCodes.map(languageCode => (
						<option value={languageCode} selected={rendered && languageSelected === languageCode ? true : false} key={languageCode}>
							<ReactCountryFlag countryCode={algorithms.removeBrackets(languages[languageCode])} />
							{" " + languages[languageCode]}
						</option>
					))
				}
			</Select>
		</Stack>
	)
}

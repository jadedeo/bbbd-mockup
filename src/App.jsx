import React, { useState, useEffect } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import GeneralIdentities from "../src/resources/general.json";
import SpecificIdentities from "../src/resources/specific.json";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function App() {
    const [masterSpecific, setMasterSpecific] = useState(SpecificIdentities);
    const [displayedSpecific, setDisplayedSpecific] = useState([]);
    const [selectedGeneral, setSelectedGeneral] = useState([]);
    const [selectedSpecific, setSelectedSpecific] = useState([]);

    const isGenUnlistedSelected = selectedGeneral.some(
        (general) => general.key === 0,
    );

    const isSpecUnlistedSelected = selectedSpecific.some(
        (specific) => specific.name === "Unlisted (Specific)",
    );
    console.log("isSpecUnlistedSelected", isSpecUnlistedSelected);

    const handleGeneralChange = (event) => {
        setSelectedGeneral(event.target.value);
    };

    const handleSpecificChange = (event) => {
        setSelectedSpecific(event.target.value);
    };

    // on mount, programmatically add "Unlisted/0" to the generalCategories array of each specific identity
    useEffect(() => {
        const specificWithUnlisted = masterSpecific.map((specific) => ({
            ...specific,
            generalCategories: [0, ...specific.generalCategories],
        }));
        setMasterSpecific(specificWithUnlisted);
    }, []);

    // when selections for General change, filter out irrelevant specific identities
    useEffect(() => {
        const filteredSpecific = masterSpecific.filter((identity) =>
            identity.generalCategories.some((cat) =>
                selectedGeneral.some((general) => general.key == cat),
            ),
        );

        setDisplayedSpecific(filteredSpecific);
    }, [selectedGeneral]);

    // TODO: remove later
    // just for printing selected specific values
    // useEffect(() => {
    //     console.log("selectedSpecific", selectedSpecific);
    // }, [selectedSpecific]);

    return (
        <main className="w-dwh min-h-dvh flex justify-center items-center">
            <div className="max-w-5xl m-[5%] rounded-lg border border-gray-300">
                <div className="grid grid-cols-4 h-3">
                    <div className=" bg-[#DFFD00]"></div>

                    <div className=" bg-[#28DDCD]"></div>

                    <div className=" bg-[#7F89FF]"></div>

                    <div className=" bg-[#FF008D]"></div>
                </div>

                <div className="p-8 bg-white flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1>Thanks for testing with us!</h1>
                        <p className="text-lg">
                            Please interact freely with the fields below to
                            familiarize yourself with how they behave & their
                            relationship to each other. When you're finished,
                            head back over to the Google Form to record any
                            comments or questions.
                        </p>
                        <hr></hr>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* GENERAL FIELDS */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h2>
                                    <label htmlFor="general">
                                        General Identity
                                    </label>
                                </h2>
                                <p>
                                    This field is meant to capture blah blah
                                    blah.
                                </p>
                                <p className="secondary">
                                    Please choose as many as apply. Learn more
                                    about{" "}
                                    <a href="/" rel="noreferrer">
                                        our "General" field values.
                                    </a>
                                </p>
                            </div>
                            <FormControl className="flex flex-col gap-8">
                                <InputLabel id="general-multi-select-label">
                                    General
                                </InputLabel>
                                <Select
                                    labelId="general-multi-select-label"
                                    id="general-multi-select"
                                    multiple
                                    value={selectedGeneral}
                                    onChange={handleGeneralChange}
                                    input={
                                        <OutlinedInput label="general-chip" />
                                    }
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((identity) => (
                                                <Chip
                                                    key={identity.key}
                                                    label={identity.name}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {GeneralIdentities.map((identity) => (
                                        <MenuItem
                                            key={identity.key}
                                            value={identity}
                                        >
                                            {identity.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                                {isGenUnlistedSelected && (
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Please specify"
                                    />
                                )}
                            </FormControl>
                        </div>

                        {/* SPECIFIC FIELDS */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h2>
                                    <label htmlFor="general">
                                        Specific Identity
                                    </label>
                                </h2>
                                <p>
                                    This field is meant to capture blah blah
                                    blah. It will only display identities that
                                    fall under one or more of the general
                                    identities selected in the previous
                                    question.
                                </p>
                                <p className="secondary">
                                    Please choose as many as apply. Learn more
                                    about{" "}
                                    <a href="/" rel="noreferrer">
                                        our "Specific" field values.
                                    </a>
                                </p>
                            </div>
                            <FormControl className="flex flex-col gap-8">
                                <InputLabel id="specific-multi-select-label">
                                    Specific
                                </InputLabel>
                                <Select
                                    labelId="specific-multi-select-label"
                                    id="specific-multi-select"
                                    multiple
                                    disabled={selectedGeneral.length === 0}
                                    value={selectedSpecific}
                                    onChange={handleSpecificChange}
                                    input={
                                        <OutlinedInput label="specific-chip" />
                                    }
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((identity) => (
                                                <Chip
                                                    key={identity.name}
                                                    label={identity.name}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {displayedSpecific.map((specific) => (
                                        <MenuItem
                                            key={specific.name}
                                            value={specific}
                                            className="flex gap-4"
                                        >
                                            {specific.name}
                                            <div className="flex gap-2">
                                                {specific.generalCategories.map(
                                                    (identity) => (
                                                        <Chip
                                                            key={identity + 1}
                                                            label={identity}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </MenuItem>
                                    ))}
                                </Select>

                                {isSpecUnlistedSelected && (
                                    <TextField
                                        required
                                        id="outlined-required-new"
                                        label="Please specify"
                                    />
                                )}
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </main>
    );
}

export default App;

import React, { useState, useEffect } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import GeneralIdentities from "../src/resources/general.json";
import SpecificIdentities from "../src/resources/specific.json";
import "./App.css";

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
    const [displayedSpecific, setDisplayedSpecific] = useState([]);
    const [selectedGeneral, setSelectedGeneral] = useState([]);
    const [selectedSpecific, setSelectedSpecific] = useState([]);

    const handleGeneralChange = (event) => {
        setSelectedGeneral(event.target.value);
    };

    const handleSpecificChange = (event) => {
        setSelectedSpecific(event.target.value);
    };

    useEffect(() => {
        const filteredSpecific = SpecificIdentities.filter((identity) =>
            identity.generalCategories.some((cat) =>
                selectedGeneral.some((general) => general.key == cat),
            ),
        );

        console.log("filteredSpecific", filteredSpecific);
        setDisplayedSpecific(filteredSpecific);
    }, [selectedGeneral]);

    useEffect(() => {
        console.log("selectedSpecific", selectedSpecific);
    }, [selectedSpecific]);

    return (
        <main className="w-dwh h-dvh flex justify-center items-center">
            <div className="card bg-white flex flex-col gap-8 border border-gray-300 rounded-lg max-w-5xl mx-[5%]">
                <div className="flex flex-col gap-4">
                    <h1>Thanks for testing with us!</h1>
                    <p className="text-xl text-gray-400">
                        Please interact freely with the fields below to
                        familiarize yourself with how they behave & their
                        relationship to each other.
                    </p>
                    <hr></hr>
                </div>

                <div className="grid grid-cols-1 gap-8 ">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2>
                                <label htmlFor="general">
                                    General Identity
                                </label>
                            </h2>
                            <p>
                                This field is meant to capture blah blah blah.
                            </p>
                            <p>
                                It supports as many selections as you require —
                                please choose as many as apply. Learn more about{" "}
                                <a href="/" rel="noreferrer">
                                    our "General" field values.
                                </a>
                            </p>
                        </div>
                        <FormControl>
                            <InputLabel id="general-multi-select-label">
                                General
                            </InputLabel>
                            <Select
                                labelId="general-multi-select-label"
                                id="general-multi-select"
                                multiple
                                value={selectedGeneral}
                                onChange={handleGeneralChange}
                                input={<OutlinedInput label="general-chip" />}
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
                        </FormControl>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2>
                                <label htmlFor="general">
                                    Specific Identity
                                </label>
                            </h2>
                            <p>
                                This field is meant to capture blah blah blah.
                                It will only display identities that fall under
                                one or more of the general identities selected
                                in the previous question.
                            </p>
                            <p>
                                It supports as many selections as you require —
                                please choose as many as apply. Learn more about{" "}
                                <a href="/" rel="noreferrer">
                                    our "Specific" field values.
                                </a>
                            </p>
                        </div>
                        <FormControl>
                            <InputLabel id="specific-multi-select-label">
                                Specific
                            </InputLabel>
                            <Select
                                labelId="specific-multi-select-label"
                                id="specific-multi-select"
                                multiple
                                value={selectedSpecific}
                                onChange={handleSpecificChange}
                                input={<OutlinedInput label="specific-chip" />}
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
                                    >
                                        {specific.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div></div>
        </main>
    );
}

export default App;

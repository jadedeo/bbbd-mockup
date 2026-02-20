import { useState, useEffect } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShortTextIcon from "@mui/icons-material/ShortText";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

import GeneralIdentities from "../src/resources/general.json";
import SpecificIdentities from "../src/resources/specific.json";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/*style={{
    marginRight: 8,
    padding: 9,
    boxSizing:
        "content-box",
}} */

function App() {
    const UNLISTED_GENERAL_KEY = 0;
    const UNLISTED_SPECIFIC_NAME = "Unlisted (Specific)";

    const generalByKey = new Map(GeneralIdentities.map((g) => [g.key, g]));

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
    }, [selectedGeneral, masterSpecific]);

    return (
        <main className="w-dwh min-h-dvh flex justify-center items-center">
            <div className="max-w-5xl m-[5%] flex flex-col gap-8">
                {/* HEADER CARD*/}
                <div>
                    <div className="grid grid-cols-4 h-3">
                        <div className=" bg-[#DFFD00]"></div>

                        <div className=" bg-[#28DDCD]"></div>

                        <div className=" bg-[#7F89FF]"></div>

                        <div className=" bg-[#FF008D]"></div>
                    </div>

                    <div className="card gap-4!">
                        <h1>Thanks for testing with us!</h1>
                        <p className="">
                            Please interact freely with the fields below to
                            familiarize yourself with how they behave & their
                            relationship to each other. When you're finished,
                            head back over to the Google Form to record any
                            comments or questions.
                        </p>
                    </div>
                </div>

                {/* FIELD CARD */}
                <div className="card">
                    <div className="grid grid-cols-1 gap-10">
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
                                    blah.{" "}
                                    <Tooltip
                                        title="Would you like to be provided the option to learn more about our field values here?"
                                        placement="right"
                                    >
                                        <InfoOutlineIcon
                                            sx={{
                                                fontSize: 16,
                                                color: "#9ca3af",
                                                marginBottom: 0.7,
                                            }}
                                        />
                                    </Tooltip>
                                </p>
                            </div>
                            <FormControl
                                className="flex flex-col gap-8"
                                sx={{
                                    "& legend": {
                                        display: "none",
                                    },
                                }}
                            >
                                <Select
                                    labelId="general-multi-select-label"
                                    id="general-multi-select"
                                    required
                                    multiple
                                    value={selectedGeneral}
                                    onChange={handleGeneralChange}
                                    inputProps={{
                                        "aria-label": "General Identity",
                                    }}
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
                                    {GeneralIdentities.map((general) => {
                                        const selected =
                                            selectedGeneral.includes(general);
                                        const SelectionIcon = selected
                                            ? CheckBoxIcon
                                            : CheckBoxOutlineBlankIcon;

                                        return (
                                            <MenuItem
                                                key={general.key}
                                                value={general}
                                            >
                                                <SelectionIcon
                                                    fontSize="small"
                                                    style={{
                                                        marginRight: 8,
                                                        padding: 9,
                                                        boxSizing:
                                                            "content-box",
                                                    }}
                                                />
                                                <ListItemText
                                                    primary={general.name}
                                                />
                                            </MenuItem>
                                        );
                                    })}
                                </Select>

                                {isGenUnlistedSelected && (
                                    <div className="flex flex-col gap-4">
                                        <h3 htmlFor="general-unlisted-elaborate">
                                            Please elaborate.
                                        </h3>
                                        <TextField
                                            required
                                            id="general-unlisted-elaborate"
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ShortTextIcon />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </div>
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
                                    question. If "Unlisted" has been selected
                                    for the field above, a full list of Specific
                                    identities will be shown.{" "}
                                    <Tooltip
                                        title="Would you like to be provided the option to learn more about our field values here?"
                                        placement="right"
                                    >
                                        <InfoOutlineIcon
                                            sx={{
                                                fontSize: 16,
                                                color: "#9ca3af",
                                                marginBottom: 0.7,
                                            }}
                                        />
                                    </Tooltip>
                                </p>
                            </div>
                            <FormControl
                                className="flex flex-col gap-8"
                                sx={{
                                    "& legend": {
                                        display: "none",
                                    },
                                }}
                            >
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
                                    inputProps={{
                                        "aria-label": "Specific Identity",
                                    }}
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
                                    {displayedSpecific.map((specific) => {
                                        const selected =
                                            selectedSpecific.includes(specific);
                                        const SelectionIcon = selected
                                            ? CheckBoxIcon
                                            : CheckBoxOutlineBlankIcon;

                                        return (
                                            <MenuItem
                                                key={specific.name}
                                                value={specific}
                                                className=""
                                            >
                                                <SelectionIcon
                                                    fontSize="small"
                                                    style={{
                                                        marginRight: 8,
                                                        padding: 9,
                                                        boxSizing:
                                                            "content-box",
                                                    }}
                                                />
                                                <ListItemText
                                                    primary={specific.name}
                                                />
                                                {specific.name !==
                                                    UNLISTED_SPECIFIC_NAME && (
                                                    <div className="flex gap-2 flex-wrap">
                                                        {specific.generalCategories
                                                            .filter(
                                                                (key) =>
                                                                    key !==
                                                                    UNLISTED_GENERAL_KEY,
                                                            ) // never show "Unlisted (General)" as a chip
                                                            .map((key) =>
                                                                generalByKey.get(
                                                                    key,
                                                                ),
                                                            ) // map key -> general object
                                                            .map((g) => (
                                                                <Chip
                                                                    key={`${specific.name}-${g.key}`}
                                                                    label={
                                                                        g.name
                                                                    }
                                                                    size="small"
                                                                />
                                                            ))}
                                                    </div>
                                                )}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>

                                {isSpecUnlistedSelected && (
                                    <div className="flex flex-col gap-4">
                                        <h3 htmlFor="specific-unlisted-elaborate">
                                            Please elaborate.
                                        </h3>
                                        <TextField
                                            required
                                            id="specific-unlisted-elaborate"
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ShortTextIcon />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </div>
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

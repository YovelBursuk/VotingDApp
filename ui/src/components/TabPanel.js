
export default function TabPanel({children, value, index, ...other}) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            {...other}
        >
            {
                value === index && (
                    <div id={`inner-tabpanel-${index}`}>
                        {children}
                    </div>
                )
            }
        </div>
    )
}
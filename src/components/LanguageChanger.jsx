import React            from "react";
import {useTranslation} from "react-i18next";

export function LanguageChanger() {
    const [t, i18n] = useTranslation('translation');
    return (
        <div>
            <button onClick={() => i18n.changeLanguage('pl')}>pl</button>
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
        </div>
    )
}

export default LanguageChanger
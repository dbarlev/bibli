import React, { useEffect } from "react";
import { termsContent } from './TermsContent';

function TermsOfService() {
    useEffect(() => {
        document.querySelector("title").textContent = "ביבלי | תקנון";
    }, [])

    return (
        <div>
            <p>{termsContent.background}</p>
            <ol>
                {termsContent.list.map(text => (
                    <li>{text}</li>
                ))}
            </ol>
            <h3 style={{ color: 'black' }}>אחריות</h3>
            <ol>
                {termsContent.responsibility.map(text => (
                    <li>{text}</li>
                ))}
            </ol>
        </div>
    )
}

export default TermsOfService;

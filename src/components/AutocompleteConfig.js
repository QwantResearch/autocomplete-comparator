import React from 'react';

export default function AutocompleteConfig({title, children}) {
    return (
        <dl>
            <dt>{title}</dt>
            <dd>
                {children}
            </dd>
        </dl>
    );
}

import React from 'react'
import { Placeholder, Segment } from 'semantic-ui-react';

const ItemPlaceholder = () => (
    <div>
        <Segment raised style={{ display: "flex" }}>
            <Placeholder style={{ width: "100%" }}>
                <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
        </Segment>

        <Segment raised style={{ display: "flex" }}>
            <Placeholder style={{ width: "100%" }}>
                <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
        </Segment>

        <Segment raised style={{ display: "flex" }}>
            <Placeholder style={{ width: "100%" }}>
                <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
        </Segment>
    </div>
);

export default ItemPlaceholder;

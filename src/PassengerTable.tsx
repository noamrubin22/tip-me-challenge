import React from 'react'
import { Page, Card, DataTable} from '@shopify/polaris';

const PassengerTable = (props: any) => {
    const rows = [
        ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
        ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
        [
          'Navy Merino Wool Blazer with khaki chinos and yellow belt',
          '$445.00',
          124518,
          32,
          '$14,240.00',
        ],
      ];

    
    return (
        <Page title="Passenger data">
            <Card>
                <DataTable 
                    columnContentTypes={[
                        "numeric",
                        "text",
                        "numeric",
                        "numeric"
                    ]}
                    headings={[
                        'ID',
                        "Name",
                        "Number of trips",
                        "Total amount paid for flights"
                    ]}
                    rows={rows}
                />
                
            </Card>
            
        </Page>
    )
}

export default PassengerTable

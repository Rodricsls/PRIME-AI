import React, { useState } from 'react';
import BounceLoader
from "react-spinners/BounceLoader";
function LoadingScreen() {
    const [Loading, setLoading] = useState(true);
    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {Loading ? 
                <BounceLoader
                    color={'#38e999'}
                    loading={Loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />

            : 
            
            
            ''}
        </div>
    );
}

export default LoadingScreen;

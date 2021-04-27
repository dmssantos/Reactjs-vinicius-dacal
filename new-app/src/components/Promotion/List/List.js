import React from 'react';
import './List.css';
import PromotionCard from 'components/Promotion/Card/Card';

const PromotionList = ({ loading, error, promotions }) => {
    if(error){
        return <div>Algo de errado não está certo</div>
    }

    if(loading || promotions === null) {
        return <div>Carregando...</div>
    }

    if(promotions.length === 0) {
        return <div>Nenhum resultado encontrado</div>
    }

    return(
        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard promotion={promotion} />
            ))}
        </div>
    )
}

export default PromotionList;
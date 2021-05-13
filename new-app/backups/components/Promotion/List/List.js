import React, { useState }from 'react';
import './List.css';
import PromotionCard from 'components/Promotion/Card/Card';
import PromotionModal from '../Modal/Modal';

const PromotionList = ({ loading, error, promotions }) => {
    const [promotionId, setPromotionId] = useState();

    if(error){
        return <div>Algo de errado não está certo</div>
    }

    if(promotions === null) {
        return <div>Carregando...</div>
    }

    if(promotions.length === 0) {
        return <div>Nenhum resultado encontrado</div>
    }

    return(
        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard 
                    promotion={promotion}
                    onClickComments={() => setPromotionId(promotion.id)}
                />
            ))}

            {loading && <div>Carregando mais prmoções...</div>}

            {promotionId && (
                <PromotionModal 
                    promotionId={promotionId}
                    onClickClose={() => setPromotionId(null)}
                />
            )}
        </div>
    )
}

export default PromotionList;
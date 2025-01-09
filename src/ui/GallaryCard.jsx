export default function GallaryCard({ title, location, Ttag, chargeType, chargeStatus, statUpdateTime }) {

    // 충전기 상태를 텍스트로 변환
    const getChargeStatusText = (status) => {
        const statusMap = {
            '0': '상태확인불가',
            '1': '충전가능',
            '2': '충전중',
            '3': '고장/점검',
            '4': '통신장애',
            '5': '통신미연결',
            '9': '충전예약',
        };
        return statusMap[status] || '알 수 없음';
    };

    // 충전 방식을 텍스트로 변환
    const getChargeTypeText = (type) => {
        const typeMap = {
            '1': 'B타입(5핀)',
            '2': 'C타입(5핀)',
            '3': 'BC타입(5핀)',
            '4': 'BC타입(7핀)',
            '5': 'DC차 데모',
            '6': 'AC 3상',
            '7': 'DC콤보',
            '8': 'DC차데모+DC콤보',
            '9': 'DC차데모+AC3상',
            '10': 'DC차데모+DC콤보+AC3상',
        };
        return typeMap[type] || '알 수 없음';
    };

    // 충전기 상태가 '충전가능'일 경우 옅은 파란색 배경으로 설정
    const cardBackgroundColor = chargeStatus === '1' ? 'bg-blue' : 'bg-red-100';

    return (
        <div className={`w-full max-w-sm rounded overflow-hidden shadow-lg ${cardBackgroundColor}`}>
            <div className="px-6 py-4 flex flex-col justify-center">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    <strong>주소:</strong> {location}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>충전방식:</strong> {getChargeTypeText(chargeType)}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>충전기 상태:</strong> {getChargeStatusText(chargeStatus)}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>확인일자:</strong> {statUpdateTime}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex flex-wrap">
                {Ttag}
            </div>
        </div>
    );
}

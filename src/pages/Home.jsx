import React from 'react';
import { useEffect, useState, useRef } from "react";
import TailSelect from '../ui/TailSelect';
import GallaryCard from '../ui/GallaryCard';

export default function Home() {
    const [tdata, setTdata] = useState(); // 전기차 충전소 정보
    const [siOptions, setSiOptions] = useState(); // 광역자치단체 옵션
    const [guOptions, setGuOptions] = useState(); // 기초자치단체 옵션
    const siRef = useRef(); // 광역자치단체 선택 Ref
    const guRef = useRef(); // 기초자치단체 선택 Ref
    const [cards, setCards] = useState();

    // data fetch
    const getFetchData = (url) => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setTdata(data.data)
            }
        );
    }

    // 광역자치단체 선택 핸들러
    const handleSiSelect = (e) => {
        e.preventDefault();
        const selectedSi = siRef.current.value;
        if (selectedSi) {
            const guList = [
                ...new Set(
                    tdata
                        .filter((item) => item.addr.startsWith(selectedSi))
                        .map((item) => item.addr.split(" ")[1])
                ),
            ];
            setGuOptions(guList.sort());
        }
    };

    // 기초자치단체 선택 핸들러
    const handleGuSelect = (e) => {
        e.preventDefault();
        const selectedGu = guRef.current.value;
        const selectedSi = siRef.current.value;
        if (selectedSi && selectedGu) {
            const filteredData = tdata.filter(
                (item) =>
                    item.addr.startsWith(selectedSi) &&
                    item.addr.includes(selectedGu)
            );
            const tm = filteredData.map((item) => (
                <GallaryCard
                key={`${item.csId}-${item.cpId}`}
                title={item.csNm}  // 충전소 명칭
                location={item.addr}  // 주소
                chargeType={item.cpTp}  // 충전방식
                chargeStatus={item.cpStat}  // 충전기 상태
                statUpdateTime={item.statUpdatetime}  // 확인일자
                lat={parseFloat(item.lat)}  // 위도
                longi={parseFloat(item.longi)}  // 경도
                />
            ));
            setCards(tm);
        }
    };


    //컴포넌트 초기화
    useEffect(() => {
        let url = `https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?`
        url = url + `perPage=3106&serviceKey=${process.env.REACT_APP_API_KEY}`

        getFetchData(url)
    }, [])

    // 광역자치단체 정보 설정
    useEffect(() => {
        if (!tdata) return;
        const siList = [...new Set(tdata.map((item) => item.addr.split(" ")[0]))];
        setSiOptions(siList.sort());
    }, [tdata]);

    // 기본 카드 생성
    useEffect(() => {
        if (!tdata) return
        let tm = tdata.map(item => 
            <GallaryCard
            key={`${item.csId}-${item.cpId}`}
            title={item.csNm}  // 충전소 명칭
            location={item.addr}  // 주소
            chargeType={item.cpTp}  // 충전방식
            chargeStatus={item.cpStat}  // 충전기 상태
            statUpdateTime={item.statUpdatetime}  // 확인일자
            lat={parseFloat(item.lat)}  // 위도
            longi={parseFloat(item.longi)}  // 경도
            />
        )
        setCards(tm)
    }, [tdata])

    return (
        <div className="w-full h-full flex flex-col justify-start items-start">
            <form className="w-full flex flex-row justify-center items-center">
                <div className="w-4/5 grid grid-cols-3 m-4">
                    <div
                        className="text-xl font-bold m-2 text-gray-900 dark:text-white"
                    >
                        지역 선택
                    </div>
                    <div className="mx-5">
                        {siOptions && (
                            <TailSelect
                                id="op-si"
                                selRef={siRef}
                                ops={siOptions}
                                initText="--- 광역자치단체 선택 ---"
                                handleChange={handleSiSelect}
                            />
                        )}
                    </div>
                    <div className="mx-5">
                        <TailSelect
                            id="op-gu"
                            selRef={guRef}
                            ops={guOptions || []} // guOptions가 없으면 빈 배열 전달
                            initText="--- 기초자치단체 선택 ---"
                            handleChange={handleGuSelect}
                        />
                    </div>
                </div>
            </form>
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-3">
                {cards}
            </div>
        </div>
    );
}
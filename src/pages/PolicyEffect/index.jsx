import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import PageTitle from "@/components/PageTitle";
import { Row, Col } from "antd";
import FooterBgcImg from "@/components/FooterBgcImg";
import useGoogleSheet from "@/hooks/useGoogleSheet";
import Loading from "@/components/Loading";
import PageError from "@/components/PageError";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DonutChart from "@/components/DonutChart";
import DonutChartNone from "@/components/DonutChartNoneColor";
import ChartCard from "@/components/ChartCard";
import useGoogleSheetFind from "@/hooks/useGoogleSheetFind";

// 正確的模組導入方式
import "highcharts/highcharts-more";
import "highcharts/modules/solid-gauge";

import PolicyIcon from "@/assets/icon/icon-policy.svg";

// 長條圖組件
const ColumnChart = ({ data, color = "#42E82C" }) => {
  const chartOptions = {
    chart: {
      type: "column",
      height: "350px",
    },
    title: {
      text: "123",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#374151",
        visibility: "hidden",
      },
    },
    xAxis: {
      type: "category",
      // categories: ["單品牌", "雙品牌", "三品牌"],
      // crosshair: true,
      labels: {
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    },

    yAxis: {
      min: 0,
      title: {
        text: "",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}筆</b>',
    },
    plotOptions: {
      column: {
        // pointPadding: 0.2,
        borderWidth: 0,
        color: color,
        // borderRadius: 3,
        // pointWidth: 30,
      },
    },
    series: [
      {
        name: "品牌數量",
        colorByPoint: true,
        data: [
          {
            name: "單品牌",
            y: data[0].value,
            color: "#2caffe",
            drilldown: "單品牌",
          },
          {
            name: "雙品牌",
            y: data[1].value,
            color: "#544fc5",
            drilldown: "雙品牌",
          },
          {
            name: "三品牌",
            y: data[2].value,
            color: "#fe6a35",
            drilldown: "三品牌",
          },
        ],
      },
    ],

    legend: {
      enabled: false,
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      borderWidth: 1,
      borderColor: "#CCCCCC",
      backgroundColor: "#FFFFFF",
    },
    credits: { enabled: false },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

function PolicyEffect() {
  const { data, loading, error, refetch, status, cleanToinit } =
    useGoogleSheetFind();

  const handleSearch = (values) => {
    refetch(values, "findProcessedData");
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // 處理數據
  const processedData = data ? data : null;
  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return <PageError />;
  }

  if (!processedData) {
    return (
      <div className="w-full flex flex-col items-center justify-center pt-[52px]">
        <PageTitle
          icon={PolicyIcon}
          iconClassName="w-[24px] h-[32px]"
          title="車行轉型成效數據"
        />
        <div className="text-center py-10">
          <p className="text-gray-500">暫無數據</p>
        </div>
        <FooterBgcImg />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[52px]">
      <PageTitle
        icon={PolicyIcon}
        iconClassName="w-[32px] h-[28px]"
        title="成效總覽"
      />
      <div className="text-right text-gray-500 text-sm mb-4">
        更新時間：
        {new Date().toLocaleString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <Row gutter={0} className="w-full">
        <Col xs={1} md={2} />
        <Col xs={22} md={20}>
          <div className="min-h-screen  py-8">
            <div className="max-w-7xl mx-auto px-4">
              {/* Donut 圖表 */}
              <Row gutter={[24, 24]} className="mb-8">
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="申請進度總覽"
                    chartComponent={
                      <DonutChart
                        title="申請進度總覽"
                        series={[
                          {
                            name: "進度",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: [
                              {
                                name: "已申請",
                                y: processedData.applicationOverview.completed,
                                color: "#42E82C",
                              },
                              {
                                name: "未申請",
                                y: processedData.applicationOverview.pending,
                                color: "#E7E7E7",
                              },
                            ],
                          },
                        ]}
                      />
                    }
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="申請核銷狀態"
                    chartComponent={
                      <DonutChart
                        title="申請核銷狀態"
                        series={[
                          {
                            name: "進度",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: [
                              {
                                name: "已核銷",
                                y: processedData.approvalStatus.approved,
                                color: "#42E82C",
                              },
                              {
                                name: "申請中",
                                y: processedData.approvalStatus.inProgress,
                                color: "#E7E7E7",
                              },
                            ],
                          },
                        ]}
                      />
                    }
                  />
                </Col>
              </Row>
              <Row gutter={[24, 24]} className="mb-8">
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="各區申請比例"
                    chartComponent={
                      <DonutChartNone
                        series={[
                          {
                            name: "各區申請",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: processedData.districtApplication.map(
                              (district) => ({
                                name: district.name,
                                y: district.value,
                                color: district.color,
                              })
                            ),
                          },
                        ]}
                      />
                    }
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="每月申請狀態"
                    chartComponent={
                      <DonutChartNone
                        series={[
                          {
                            name: "每月申請",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: processedData.monthlyApplication
                              .map((month) => ({
                                name: month.name,
                                y: month.value,
                                color: month.color,
                              }))
                              .filter((point) => point.y > 0),
                          },
                        ]}
                      />
                    }
                  />
                </Col>
              </Row>

              {/* 堆疊圖表和品牌圓餅圖 */}
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="各品牌申請比例"
                    chartComponent={
                      <DonutChartNone
                        series={[
                          {
                            name: "各區申請",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: processedData.brandApplication.map(
                              (item) => ({
                                name: item.name,
                                y: item.value,
                                color:
                                  {
                                    SYM三陽: "#2caffe",
                                    YAMAHA山葉: "#544fc5",
                                    eMOVING中華: "#fe6a35",
                                    eReady台鈴: "#fa4b42",
                                    Ionex光陽: "#6b8abc",
                                    AeonMOTOR宏佳騰: "#2ee0ca",
                                    Zau泓創綠能: "#feb56a",
                                    Gogoro睿能: "#d568fb",
                                    "PGO 摩特動力": "#feb56a",
                                  }[item.name] || "#feb56a", // 預設顏色
                              })
                            ),
                          },
                        ]}
                      />
                    }
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="單/雙/三品牌"
                    chartComponent={
                      <ColumnChart data={processedData.barndCount} />
                    }
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={1} md={2} />
      </Row>

      <FooterBgcImg />
    </div>
  );
}

export default PolicyEffect;

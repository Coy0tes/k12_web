<template>
    <div>
        员工
        <div id="myChart1" :style="{width: '800px', height: '400px'}"></div>
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
        // 引入柱状图组件
        require('echarts/lib/chart/pie')
        require('echarts/lib/chart/bar')
        require('echarts/lib/chart/line')
        // 引入提示框和title组件
        require('echarts/lib/component/tooltip')
        require('echarts/lib/component/title')
    export default {
        data(){
            return {

            }
        },
        methods:{
              drawLine1() {
             
                          let myChart1 = echarts.init(document.getElementById('myChart1'))
                          // console.log('0000000000',)
                       var dataCount = 55;
                                    var data = generateData(dataCount);

                                    var option = {
                                        title: {
                                            text: echarts.format.addCommas(dataCount) + ' Data',
                                            left: 10
                                        },
                                        toolbox: {
                                            feature: {
                                                dataZoom: {
                                                    yAxisIndex: false
                                                },
                                                saveAsImage: {
                                                    pixelRatio: 2
                                                }
                                            }
                                        },
                                        tooltip: {
                                            trigger: 'axis',
                                            axisPointer: {
                                                type: 'shadow'
                                            }
                                        },
                                        grid: {
                                            bottom: 90
                                        },
                                        dataZoom: [{
                                            type: 'inside'
                                        }, {
                                            type: 'slider'
                                        }],
                                        xAxis: {
                                            data: data.categoryData,
                                            silent: false,
                                            splitLine: {
                                                show: false
                                            },
                                            splitArea: {
                                                show: false
                                            }
                                        },
                                        yAxis: {
                                            splitArea: {
                                                show: false
                                            }
                                        },
                                        series: [{
                                            type: 'bar',
                                            data: data.valueData,
                                            // Set `large` for large data amount
                                            large: true
                                        }]
                                    };

                                    function generateData(count) {
                                        var baseValue = Math.random() * 1000;
                                        var time = +new Date(2011, 0, 1);
                                        var smallBaseValue;

                                        function next(idx) {
                                            smallBaseValue = idx % 30 === 0
                                                ? Math.random() * 700
                                                : (smallBaseValue + Math.random() * 500 - 250);
                                            baseValue += Math.random() * 20 - 10;
                                            return Math.max(
                                                0,
                                                Math.round(baseValue + smallBaseValue) + 3000
                                            );
                                        }

                                        var categoryData = [];
                                        var valueData = [];

                                        for (var i = 0; i < count; i++) {
                                            categoryData.push(echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time));
                                            valueData.push(next(i).toFixed(2));
                                            time += 1000;
                                        }

                                        return {
                                            categoryData: categoryData,
                                            valueData: valueData
                                        };
                                    }





                          myChart1.setOption(option);
                            }, 
        },
        mounted(){
            this.drawLine1();
        }
    }
</script>
<style>
    
</style>
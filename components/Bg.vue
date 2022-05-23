<script setup lang="ts">
import { isDark } from '#imports'

const color = computed(() => isDark.value ? '#fff' : '#0d9488')
</script>

<template>
  <div
    class="bg -z-1 bg-$bg-default dark:bg-$bg-dark-default toDark"
    pf
    top-0
    left-0
    overflow-hidden
    h-screen
    w-screen
    bg="no-repeat [length:200%_200%]"
  >
    <div>
      <div
        class="signup-bg-stars -z-200"
        :class="isDark ? 'text-white' : 'text-red'"
        w="1px"
        h="1px"
        bg-transparent
        rounded-full
        after="absolute top-2000px w-[1px] h-[1px] rounded-[10px] bg-transparent"
      />
      <div class="signup-bg-stars-2" rounded-full w="2px" h="2px" after="w-[2px] h-[2px]" />
      <div class="signup-bg-stars-3" rounded-full w="3px" h="3px" after="w-[3px] h-[3px]" />
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-position: 50% 50%;
}
.signup-bg-stars {
  box-shadow: 750px 740px rgba(255, 255, 255, 0.2), 1350px 631px v-bind(color),
    56px 1452px v-bind(color), 554px 1842px v-bind(color),
    1977px 711px v-bind(color), 1773px 515px v-bind(color),
    1874px 323px v-bind(color), 382px 762px v-bind(color),
    1327px 1856px v-bind(color), 921px 157px v-bind(color),
    1802px 703px v-bind(color), 1612px 757px v-bind(color),
    1758px 724px v-bind(color), 1706px 307px v-bind(color),
    616px 487px v-bind(color), 702px 1618px v-bind(color),
    424px 1839px v-bind(color), 648px 1417px v-bind(color),
    1671px 319px v-bind(color), 304px 750px v-bind(color),
    1140px 1473px v-bind(color), 572px 193px v-bind(color),
    1501px 1292px v-bind(color), 119px 1214px v-bind(color),
    1637px 1164px v-bind(color), 1540px 1242px v-bind(color),
    1722px 1715px v-bind(color), 1691px 1010px v-bind(color),
    236px 433px v-bind(color), 1336px 950px v-bind(color),
    1168px 1193px v-bind(color), 304px 855px v-bind(color),
    322px 1892px v-bind(color), 260px 231px v-bind(color),
    1984px 1336px v-bind(color), 1630px 149px v-bind(color),
    650px 1260px v-bind(color), 1208px 1841px v-bind(color),
    1361px 628px v-bind(color), 261px 412px v-bind(color),
    1105px 869px v-bind(color), 1207px 1819px v-bind(color),
    1923px 323px v-bind(color), 224px 1390px v-bind(color),
    1248px 540px v-bind(color), 1024px 1544px v-bind(color),
    986px 1703px v-bind(color), 425px 1150px v-bind(color),
    547px 1821px v-bind(color), 1470px 1215px v-bind(color),
    1511px 1178px v-bind(color), 472px 1850px v-bind(color),
    1684px 1003px v-bind(color), 1987px 1466px v-bind(color),
    453px 1830px v-bind(color), 482px 433px v-bind(color),
    835px 1784px v-bind(color), 1193px 958px v-bind(color),
    306px 88px v-bind(color), 928px 1389px v-bind(color),
    349px 1592px v-bind(color), 1053px 1676px v-bind(color),
    1492px 513px v-bind(color), 1855px 1115px v-bind(color),
    93px 1316px v-bind(color), 1244px 95px v-bind(color),
    1429px 545px v-bind(color), 1802px 1521px v-bind(color),
    479px 714px v-bind(color), 221px 785px v-bind(color);
  animation: animStar 100s linear infinite;
}

.signup-bg-stars::after {
  content: " ";
  box-shadow: 750px 740px rgba(255, 255, 255, 0.2), 1350px 631px v-bind(color),
    56px 1452px v-bind(color), 554px 1842px v-bind(color),
    1977px 711px v-bind(color), 1773px 515px v-bind(color),
    1874px 323px v-bind(color), 382px 762px v-bind(color),
    1327px 1856px v-bind(color), 921px 157px v-bind(color),
    1802px 703px v-bind(color), 1612px 757px v-bind(color),
    1758px 724px v-bind(color), 1706px 307px v-bind(color),
    616px 487px v-bind(color), 702px 1618px v-bind(color),
    424px 1839px v-bind(color), 648px 1417px v-bind(color),
    1671px 319px v-bind(color), 304px 750px v-bind(color),
    1140px 1473px v-bind(color), 572px 193px v-bind(color),
    1501px 1292px v-bind(color), 119px 1214px v-bind(color),
    1637px 1164px v-bind(color), 1540px 1242px v-bind(color),
    1722px 1715px v-bind(color), 1691px 1010px v-bind(color),
    236px 433px v-bind(color), 1336px 950px v-bind(color),
    1168px 1193px v-bind(color), 304px 855px v-bind(color),
    322px 1892px v-bind(color), 260px 231px v-bind(color),
    1984px 1336px v-bind(color), 1630px 149px v-bind(color),
    650px 1260px v-bind(color), 1208px 1841px v-bind(color),
    1361px 628px v-bind(color), 261px 412px v-bind(color),
    1105px 869px v-bind(color), 1207px 1819px v-bind(color),
    1923px 323px v-bind(color), 224px 1390px v-bind(color),
    1248px 540px v-bind(color), 1024px 1544px v-bind(color),
    986px 1703px v-bind(color), 425px 1150px v-bind(color),
    547px 1821px v-bind(color), 1470px 1215px v-bind(color),
    1511px 1178px v-bind(color), 472px 1850px v-bind(color),
    1684px 1003px v-bind(color), 1987px 1466px v-bind(color),
    453px 1830px v-bind(color), 482px 433px v-bind(color),
    835px 1784px v-bind(color), 1193px 958px v-bind(color),
    306px 88px v-bind(color), 928px 1389px v-bind(color),
    349px 1592px v-bind(color), 1053px 1676px v-bind(color),
    1492px 513px v-bind(color), 1855px 1115px v-bind(color),
    93px 1316px v-bind(color), 1244px 95px v-bind(color),
    1429px 545px v-bind(color), 1802px 1521px v-bind(color),
    479px 714px v-bind(color), 221px 785px v-bind(color);
  opacity: 0.7;
}

.signup-bg-stars-2 {
  box-shadow: 18px 249px rgba(255, 255, 255, 0.2), 1010px 1194px v-bind(color),
    1566px 862px v-bind(color), 1522px 47px v-bind(color),
    1268px 1429px v-bind(color), 685px 239px v-bind(color),
    511px 1827px v-bind(color), 1862px 1202px v-bind(color),
    1869px 491px v-bind(color), 912px 344px v-bind(color), 11px 208px v-bind(color),
    1694px 572px v-bind(color), 779px 662px v-bind(color),
    1430px 812px v-bind(color), 365px 1526px v-bind(color),
    185px 823px v-bind(color), 1954px 1745px v-bind(color),
    445px 1728px v-bind(color), 826px 1711px v-bind(color),
    1703px 1366px v-bind(color);
  animation: animStar 150s linear infinite;
}

.signup-bg-stars-2::after {
  box-shadow: 18px 249px rgba(255, 255, 255, 0.2), 1010px 1194px v-bind(color),
    1566px 862px v-bind(color), 1522px 47px v-bind(color),
    1268px 1429px v-bind(color), 685px 239px v-bind(color),
    511px 1827px v-bind(color), 1862px 1202px v-bind(color),
    1869px 491px v-bind(color), 912px 344px v-bind(color), 11px 208px v-bind(color),
    1694px 572px v-bind(color), 779px 662px v-bind(color),
    1430px 812px v-bind(color), 365px 1526px v-bind(color),
    185px 823px v-bind(color), 1954px 1745px v-bind(color),
    445px 1728px v-bind(color), 826px 1711px v-bind(color),
    1703px 1366px v-bind(color);
}

.signup-bg-stars-3 {
  box-shadow: 588px 305px rgba(255, 255, 255, 0.2), 1968px 1036px v-bind(color),
    970px 941px v-bind(color), 655px 814px v-bind(color), 376px 480px v-bind(color),
    257px 519px v-bind(color), 1417px 545px v-bind(color),
    872px 281px v-bind(color), 724px 937px v-bind(color),
    304px 1811px v-bind(color);
  animation: animStar 200s linear infinite;
}

.signup-bg-stars-3::after {
  box-shadow: 588px 305px rgba(255, 255, 255, 0.2), 1968px 1036px v-bind(color),
    970px 941px v-bind(color), 655px 814px v-bind(color), 376px 480px v-bind(color),
    257px 519px v-bind(color), 1417px 545px v-bind(color),
    872px 281px v-bind(color), 724px 937px v-bind(color),
    304px 1811px v-bind(color);
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-2000px);
  }
}
</style>

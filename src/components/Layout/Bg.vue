<template>
  <div class="bg bg-img">
    <div>
      <div class="signup-bg-stars"></div>
      <div class="signup-bg-stars-2"></div>
      <div class="signup-bg-stars-3"></div>
    </div>
    <!-- <img class="bg-img" src="" alt="Glowing universe" /> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
</script>
<style lang="scss" scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: #040d21;

  &-img {
    background-image: url('@/assets/hero-glow.svg');
    background-size: 200% 200%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
}
// .bg-img {
//   // z-index: 0;
//   user-select: none;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 100vw;
//   transform: translate(-50%, -50%) scale(2);
//   overflow: hidden;
// }

.signup-bg-stars {
  z-index: -200;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 750px 740px rgba(255, 255, 255, 0.2), 1350px 631px #fff,
    56px 1452px #fff, 554px 1842px #fff, 1977px 711px #fff, 1773px 515px #fff,
    1874px 323px #fff, 382px 762px #fff, 1327px 1856px #fff, 921px 157px #fff,
    1802px 703px #fff, 1612px 757px #fff, 1758px 724px #fff, 1706px 307px #fff,
    616px 487px #fff, 702px 1618px #fff, 424px 1839px #fff, 648px 1417px #fff,
    1671px 319px #fff, 304px 750px #fff, 1140px 1473px #fff, 572px 193px #fff,
    1501px 1292px #fff, 119px 1214px #fff, 1637px 1164px #fff,
    1540px 1242px #fff, 1722px 1715px #fff, 1691px 1010px #fff, 236px 433px #fff,
    1336px 950px #fff, 1168px 1193px #fff, 304px 855px #fff, 322px 1892px #fff,
    260px 231px #fff, 1984px 1336px #fff, 1630px 149px #fff, 650px 1260px #fff,
    1208px 1841px #fff, 1361px 628px #fff, 261px 412px #fff, 1105px 869px #fff,
    1207px 1819px #fff, 1923px 323px #fff, 224px 1390px #fff, 1248px 540px #fff,
    1024px 1544px #fff, 986px 1703px #fff, 425px 1150px #fff, 547px 1821px #fff,
    1470px 1215px #fff, 1511px 1178px #fff, 472px 1850px #fff,
    1684px 1003px #fff, 1987px 1466px #fff, 453px 1830px #fff, 482px 433px #fff,
    835px 1784px #fff, 1193px 958px #fff, 306px 88px #fff, 928px 1389px #fff,
    349px 1592px #fff, 1053px 1676px #fff, 1492px 513px #fff, 1855px 1115px #fff,
    93px 1316px #fff, 1244px 95px #fff, 1429px 545px #fff, 1802px 1521px #fff,
    479px 714px #fff, 221px 785px #fff;
  animation: animStar 100s linear infinite;
}

.signup-bg-stars::after {
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  content: ' ';
  background: transparent;
  border-radius: 10px;
  box-shadow: 750px 740px rgba(255, 255, 255, 0.2), 1350px 631px #fff,
    56px 1452px #fff, 554px 1842px #fff, 1977px 711px #fff, 1773px 515px #fff,
    1874px 323px #fff, 382px 762px #fff, 1327px 1856px #fff, 921px 157px #fff,
    1802px 703px #fff, 1612px 757px #fff, 1758px 724px #fff, 1706px 307px #fff,
    616px 487px #fff, 702px 1618px #fff, 424px 1839px #fff, 648px 1417px #fff,
    1671px 319px #fff, 304px 750px #fff, 1140px 1473px #fff, 572px 193px #fff,
    1501px 1292px #fff, 119px 1214px #fff, 1637px 1164px #fff,
    1540px 1242px #fff, 1722px 1715px #fff, 1691px 1010px #fff, 236px 433px #fff,
    1336px 950px #fff, 1168px 1193px #fff, 304px 855px #fff, 322px 1892px #fff,
    260px 231px #fff, 1984px 1336px #fff, 1630px 149px #fff, 650px 1260px #fff,
    1208px 1841px #fff, 1361px 628px #fff, 261px 412px #fff, 1105px 869px #fff,
    1207px 1819px #fff, 1923px 323px #fff, 224px 1390px #fff, 1248px 540px #fff,
    1024px 1544px #fff, 986px 1703px #fff, 425px 1150px #fff, 547px 1821px #fff,
    1470px 1215px #fff, 1511px 1178px #fff, 472px 1850px #fff,
    1684px 1003px #fff, 1987px 1466px #fff, 453px 1830px #fff, 482px 433px #fff,
    835px 1784px #fff, 1193px 958px #fff, 306px 88px #fff, 928px 1389px #fff,
    349px 1592px #fff, 1053px 1676px #fff, 1492px 513px #fff, 1855px 1115px #fff,
    93px 1316px #fff, 1244px 95px #fff, 1429px 545px #fff, 1802px 1521px #fff,
    479px 714px #fff, 221px 785px #fff;
  opacity: 0.7;
}

.signup-bg-stars-2 {
  width: 2px;
  height: 2px;
  /* box-shadow:18px 249px rgba(255,255,255,.2), 1010px 1194px #FFF, 1566px 862px #FFF, 1522px 47px #FFF, 1268px 1429px #FFF, 685px 239px #FFF, 511px 1827px #FFF, 1862px 1202px #FFF, 1869px 491px #FFF, 912px 344px #FFF, 11px 208px #FFF, 1694px 572px #FFF, 779px 662px #FFF, 1430px 812px #FFF, 365px 1526px #FFF, 185px 823px #FFF, 1954px 1745px #FFF, 445px 1728px #FFF, 826px 1711px #FFF, 1703px 1366px #FFF; */
  /* animation:animStar 150s linear infinite; */
}

.signup-bg-stars-2::after {
  width: 2px;
  height: 2px;
  box-shadow: 18px 249px rgba(255, 255, 255, 0.2), 1010px 1194px #fff,
    1566px 862px #fff, 1522px 47px #fff, 1268px 1429px #fff, 685px 239px #fff,
    511px 1827px #fff, 1862px 1202px #fff, 1869px 491px #fff, 912px 344px #fff,
    11px 208px #fff, 1694px 572px #fff, 779px 662px #fff, 1430px 812px #fff,
    365px 1526px #fff, 185px 823px #fff, 1954px 1745px #fff, 445px 1728px #fff,
    826px 1711px #fff, 1703px 1366px #fff;
}

.signup-bg-stars-3 {
  width: 3px;
  height: 3px;
  box-shadow: 588px 305px rgba(255, 255, 255, 0.2), 1968px 1036px #fff,
    970px 941px #fff, 655px 814px #fff, 376px 480px #fff, 257px 519px #fff,
    1417px 545px #fff, 872px 281px #fff, 724px 937px #fff, 304px 1811px #fff;
  animation: animStar 200s linear infinite;
}

.signup-bg-stars-3::after {
  width: 3px;
  height: 3px;
  box-shadow: 588px 305px rgba(255, 255, 255, 0.2), 1968px 1036px #fff,
    970px 941px #fff, 655px 814px #fff, 376px 480px #fff, 257px 519px #fff,
    1417px 545px #fff, 872px 281px #fff, 724px 937px #fff, 304px 1811px #fff;
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

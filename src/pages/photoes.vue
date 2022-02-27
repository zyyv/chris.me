<script lang='ts' setup>
// import faker from '@faker-js/faker'
// import { getRandom } from '@chris-zhu/utils'

useTitle('Chris\' Blog | Photoes')

const imgs: string[] = ['http://placeimg.com/303/576/abstract', 'http://placeimg.com/368/391/animals', 'http://placeimg.com/265/262/abstract', 'http://placeimg.com/364/486/transport', 'http://placeimg.com/450/415/abstract', 'http://placeimg.com/785/265/cats', 'http://placeimg.com/731/382/city', 'http://placeimg.com/480/816/cats', 'http://placeimg.com/566/784/sports', 'http://placeimg.com/384/749/nature', 'http://placeimg.com/334/846/nightlife', 'http://placeimg.com/278/808/city', 'http://placeimg.com/634/820/business', 'http://placeimg.com/410/284/cats', 'http://placeimg.com/759/655/people', 'http://placeimg.com/555/808/abstract', 'http://placeimg.com/615/792/technics', 'http://placeimg.com/336/295/fashion', 'http://placeimg.com/512/420/city', 'http://placeimg.com/471/701/transport', 'http://placeimg.com/808/647/cats', 'http://placeimg.com/668/413/technics', 'http://placeimg.com/477/722/sports', 'http://placeimg.com/738/331/nature', 'http://placeimg.com/627/803/food', 'http://placeimg.com/607/823/food', 'http://placeimg.com/474/363/sports', 'http://placeimg.com/411/360/animals', 'http://placeimg.com/662/804/cats', 'http://placeimg.com/468/704/fashion', 'http://placeimg.com/553/629/food', 'http://placeimg.com/840/786/sports', 'http://placeimg.com/794/803/nightlife', 'http://placeimg.com/612/668/business', 'http://placeimg.com/515/844/sports', 'http://placeimg.com/634/606/business', 'http://placeimg.com/378/454/sports', 'http://placeimg.com/795/820/fashion', 'http://placeimg.com/373/783/cats', 'http://placeimg.com/419/309/technics', 'http://placeimg.com/621/571/people', 'http://placeimg.com/699/349/people', 'http://placeimg.com/572/812/city', 'http://placeimg.com/282/384/technics', 'http://placeimg.com/267/359/people', 'http://placeimg.com/704/416/cats', 'http://placeimg.com/445/421/transport', 'http://placeimg.com/794/675/food', 'http://placeimg.com/844/779/sports', 'http://placeimg.com/548/615/food', 'http://placeimg.com/543/481/nature', 'http://placeimg.com/551/569/fashion', 'http://placeimg.com/302/423/fashion', 'http://placeimg.com/470/488/nature', 'http://placeimg.com/294/371/city', 'http://placeimg.com/578/831/business', 'http://placeimg.com/509/617/fashion', 'http://placeimg.com/318/545/nature', 'http://placeimg.com/447/332/transport', 'http://placeimg.com/791/739/transport', 'http://placeimg.com/418/511/nightlife', 'http://placeimg.com/391/522/fashion', 'http://placeimg.com/506/669/nightlife', 'http://placeimg.com/739/581/sports', 'http://placeimg.com/451/261/technics', 'http://placeimg.com/713/685/nature', 'http://placeimg.com/753/554/food', 'http://placeimg.com/314/726/technics', 'http://placeimg.com/420/502/sports', 'http://placeimg.com/344/251/business', 'http://placeimg.com/657/277/nightlife', 'http://placeimg.com/520/609/cats', 'http://placeimg.com/287/395/sports', 'http://placeimg.com/452/376/nature', 'http://placeimg.com/828/510/nature', 'http://placeimg.com/650/545/cats', 'http://placeimg.com/781/358/animals', 'http://placeimg.com/657/549/business', 'http://placeimg.com/520/525/business', 'http://placeimg.com/346/342/cats', 'http://placeimg.com/803/407/sports', 'http://placeimg.com/564/290/abstract', 'http://placeimg.com/402/758/fashion', 'http://placeimg.com/309/687/technics', 'http://placeimg.com/546/268/abstract', 'http://placeimg.com/715/276/food', 'http://placeimg.com/506/508/people', 'http://placeimg.com/721/336/sports', 'http://placeimg.com/810/837/animals', 'http://placeimg.com/544/316/food', 'http://placeimg.com/661/391/nature', 'http://placeimg.com/750/705/cats', 'http://placeimg.com/558/726/nature', 'http://placeimg.com/650/624/transport', 'http://placeimg.com/687/274/fashion', 'http://placeimg.com/327/845/sports', 'http://placeimg.com/598/709/city', 'http://placeimg.com/363/378/business', 'http://placeimg.com/270/452/transport', 'http://placeimg.com/630/322/abstract']

// for (let i = 0; i < 100; i++)
//   imgs.push(faker.image.image(getRandom(250, 600), getRandom(250, 600)))

// console.log(imgs)
</script>

<template>
  <div>
    <p dark="c-white">
      developing···
    </p>
    <div>mock images</div>
    <img v-for="src in imgs" :key="src" width="200" :src="src">
  </div>
</template>

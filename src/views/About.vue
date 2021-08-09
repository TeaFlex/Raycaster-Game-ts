<template>
    <section class="content">
        <h2>What is Raycasting ?</h2>
        <p>
            Raycasting is a rendering method to create a 3D-like environment from a 2D map. 
            This technique was often used way back when computers didn't have much power to run 3D
            engines in realtime. 
        </p>
        <p>
            This way of rendering has been used in famous projects such as Wolfenstein 3D.
        </p>

        <div class="galery">
            <clickable-img src="img/wolfenstein.jpg" alt="Wolfenstein gameplay">Wolfenstein gameplay</clickable-img>
            <clickable-img src="img/example.png" alt="example">Raycast example</clickable-img>
        </div>

        <h2>How does it work ?</h2>
        <p>
            For short, the principle is to cast rays from a specific point (the player) and calculate
            the intersection point with a plain block for each ray. When this point is found, it's then possibl, by calculating
            the distance between the player and this point, to know how far or close a wall is. 
        </p>
        <p>
            There're multiple methods to obtain a such result. One of them is to divide each ray in 
            points and take the first that hits a plain block as the intersection point of the casted ray.
        </p>
        <p>
            Not only the above method works, but it's quite unoptimized. To settle this issue, each intersection point
            is calcuted by using triangle trigonometry. For each ray, intersection with vertical lines then horizontals are
            calculated, if it doesn't hit a plain block, the distance between the current horizontal/vertical line and the next one is added.
            It goes on until the instersection point is on a plain block side. Afterwards, for a ray, we got two distances: one from
            horizontal calculation and the other from vertical calculation. Both distances are compared and only the shortest one is retained, 
            this is the distance between the player and the wall.
            This method is known as the "<a href="https://en.wikipedia.org/wiki/Digital_differential_analyzer_(graphics_algorithm)" target="_blank" rel="noopener noreferrer">DDA algorithm</a>".
        </p>
        <p>
            For more informations, please consult <a href="https://lodev.org/cgtutor/raycasting.html" target="_blank">this article</a>.
        </p>

        <h2>Why having done this project ?</h2>
        <p>
            In the first place, I only wanted to realize a tiny project using WebGL in order to learn more about it while
            challenging myself. I remembered having followed a great tutorial from <a href="https://www.youtube.com/user/artsage1" target="_blank" rel="noopener noreferrer">3DSage</a> where he
            made his own raycaster from scratch in C with OpenGL. Back then, I only copied his code (sorry haha) just to see the result.
            As said earlier, I wanted to challenge myself, so I decided to remake from scratch this raycaster but by using Typescript and the WebGL library "<a href="https://threejs.org/" target="_blank" rel="noopener noreferrer">Three.js</a>".
            This little project was a way for me to learn more about the functioning of this well established
            rendering technique. Further I went in the documentation, more I found it interesting.
        </p>

        <div class="galery">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gYRrGTC7GtA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PC1RaETIx3Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <h2>It's quite buggy, what the hell ?!</h2>
        <p>
            Yeah, I know ! This project was just a test but I will try to maintain it in order to correct them. 
            Plus, I want to implement some features during my free time, so come back sometimes
            to see what changed after a while. ;)
        </p>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import clickableImg from "../components/ClickableImg.vue";

@Options({
  components: {
    clickableImg,
  }
})
export default class About extends Vue {

}
</script>

<style>

</style>
<template>
	<div>
		<ParticleText text="&lt;Hello World /&gt;"></ParticleText>
		<div class="hero">
			<div class="container">
				<div class="hero__subtitle" ref="skewText">
					Я front end разработчик,<br />
					проживающий<br />
					в России, Казань.
				</div>
				<router-link to="/works"><Button class="hero__button">Посмотреть работы</Button></router-link>
			</div>
		</div>

		<div class="work">
			<div class="container">
				<WorkList :works="works"></WorkList>

				<!-- <div class="work__list" ref="skewText">
					<div class="sub-text">Это ещё не все</div>
					<br />
					<router-link to="/works"
						><ArrowLink>все работы</ArrowLink></router-link
					>
				</div> -->
			</div>
		</div>
	</div>
</template>

<style lang="sass">
.work
	&__list
		margin-bottom: 20vh
</style>

<script>
import SlideText from "@/components/SlideText";
import ParticleText from "@/components/ParticleText";
import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import WorkList from "@/components/WorkList";

export default {
	data() {
		return {
			works: [
				{
					title: "Корпоративный сайт медицинского центра «Сердце»",
					desc: "Копоративный сайт",
					video: "centrserdce",
					url: "https://centrserdce.ru/",
				},
				{
					title: "Короротивный сайт «Морпосад Кабель»",
					desc: "Корпоративный сайт",
					video: "mpkabel",
					url: "https://www.mpkabel.ru/",
				},
				{
					title: "Интернет-магазин «Дымов»",
					desc: "Интернет-магазин",
					video: "dymov",
					url: "https://www.v-dymov.ru/"
				},
			],
		};
	},
	name: "home",
	components: { SlideText, ParticleText, Button, WorkList, ArrowLink },
};
</script>

<template>
    <div>
        <div>
            <router-link to="/game">게임매쳐</router-link>
            <router-link to='/game/number-baseball'>숫자야구</router-link>
            <router-link to='/game/rock-paper-scissors'>가위바위보</router-link>
            <router-link to='/game/lotto'>로또추첨기</router-link>
        </div>
        <game-matcher></game-matcher>
        <router-view></router-view>
    </div>
</template>

<script>
    import router from './routes';
    import GameMatcher from './GameMatcher'
    export default {
        router,
        GameMatcher
    }
</script>

<style>
    
</style>
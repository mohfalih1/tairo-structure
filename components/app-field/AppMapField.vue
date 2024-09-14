<script setup lang="ts">
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
// import 'leaflet/dist/leaflet.css'

const props = defineProps<{
    isDisabled?: boolean
    isButtonShowen?: boolean
    mapHeight?: string
    lat: number
    lng: number
}>()

const emit = defineEmits(['locationSet'])
const map = ref(null)
const center = ref([props.lat, props.lng])

const centerUpdated = (val: number[]) => {
    center.value = val
    emit('locationSet', center.value)
}

// get the current location of the user

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            center.value = [coords.latitude, coords.longitude]
        })
    }
}

const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng
    center.value = [lat, lng]
    emit('locationSet', center.value)
}
</script>

<template>
    <div class="relative" :style="`height: ${props.mapHeight};`">
        <LMap
            ref="map"
            :zoom="14"
            :center="center"
            :use-global-leaflet="false"
            @update:center="centerUpdated"
            @click="handleMapClick"
            class="rounded-lg"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LMarker :lat-lng="center" />
        </LMap>
        <BaseButton
            size="sm"
            color="primary"
            class="absolute z-[10000] bottom-0 left-0 m-2.5"
            @click="() => getLocation()"
        >
            الذهاب لموقعي الحالي
        </BaseButton>
    </div>
</template>

<style>
.leaflet-control-attribution {
    display: none;
}
</style>

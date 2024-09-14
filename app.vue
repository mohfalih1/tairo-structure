<script setup lang="ts">
const app = useAppConfig()

// global meta information can be added to the head
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} - ${app.tairo?.title}`
            : `${app.tairo?.title}`
    },
    htmlAttrs: {
        lang: 'ar',
        dir: 'rtl',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '~public/logo.png',
        },
    ],
})
</script>

<template>
    <div>
        <NuxtLayout class="dark">
            <NuxtLoadingIndicator color="rgb(var(--color-primary-500))" />
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<style>
.nui-input-wrapper.nui-input-default
    .nui-input:where([class~='dark'], [class~='dark'] *),
.nui-textarea-wrapper.nui-textarea-default
    .nui-textarea:where([class~='dark'], [class~='dark'] *),
.nui-autocomplete.nui-autocomplete-default
    .nui-autocomplete-input:where([class~='dark'], [class~='dark'] *) {
    border-color: #e2e8f000;
    background-color: #1c1c1c;
    --tw-bg-opacity: 0 !important;
}
.nui-input-wrapper.nui-input-default
    .nui-input:focus-within:where([class~='dark'], [class~='dark'] *),
.nui-textarea-wrapper.nui-textarea-default
    .nui-textarea:focus-within:where([class~='dark'], [class~='dark'] *),
.nui-autocomplete.nui-autocomplete-default
    .nui-autocomplete-input:focus-within:where(
        [class~='dark'],
        [class~='dark'] *
    ) {
    outline-color: #7b8798 !important;
}
.nui-input-label,
.nui-autocomplete-label,
.nui-textarea-label {
    width: 100%;
    text-align: justify;
    color: #e2e8f0 !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    padding-bottom: 8px !important;
}

.nui-autocomplete
    .nui-autocomplete-clear:where([class~='dark'], [class~='dark'] *) {
    color: #b4672e !important;
}

.md-editor-modal-header {
    justify-content: end !important;
}

.md-editor-modal-body {
    direction: ltr;
}

.nui-tabs .nui-tab-item {
    text-align: center;
    width: -webkit-fill-available;
}

.nui-tabs.nui-tabs-primary
    .nui-tab-item:not(.nui-active):where([class~='dark'], [class~='dark'] *) {
    color: #7b8798 !important;
    border: 0px !important;
}

.nui-tabs.nui-tabs-primary
    .nui-tab-item.nui-active:where([class~='dark'], [class~='dark'] *) {
    color: #f3efec !important;
    background-image: linear-gradient(
        90deg,
        transparent,
        #037EFF,
        transparent
    );
    border-radius: 14px;
    border: 0px !important;
}

.dp__label {
    padding-bottom: 0.25rem;
    font-size: 0.825rem;
    color: #e2e8f0;
}

.nui-autocomplete-results-item {
    cursor: pointer;
}

.dp__input {
    background-color: #1c1c1c !important;
    border-color: #e2e8f000 !important;
}

.dp__input_focus{
    outline-style: dashed !important;
    outline-width: 2px !important;
    outline-offset: 2px !important;
    outline-color: #7b8798 !important;
    /* border-color: #aaaeb7 !important; */
}

input::placeholder,
textarea::placeholder {
    color: #7b8798b1 !important;
}
input,
textarea {
    color: #e2e8f0 !important;
}

.nui-checkbox .nui-checkbox-outer {
    transition: all 300ms;
}

.nui-checkbox
    .nui-checkbox-outer:focus-within:where([class~='dark'], [class~='dark'] *) {
    outline-color: #7b879800 !important;
    color: #231f1c !important;
}

.nui-checkbox
    .nui-checkbox-outer:hover:where([class~='dark'], [class~='dark'] *) {
    outline-color: #7b8798 !important;
}
.nui-icon-check {
    color: #2D99FF;
}

.nui-checkbox-inner {
    background-color: #037EFF !important;
    border-color: #bca19000 !important;
}

#nt-container div[role='alert']:focus-within {
    outline-style: none !important;    
}
</style>

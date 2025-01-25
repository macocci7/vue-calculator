import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import { describe, expect, test } from 'vitest';

describe("App.vue", () => {
    test("The initial value of digits is zero", () => {
        const wrapper = shallowMount(App, {});
        expect(wrapper.find(".digits").text()).toBe("0");
    });

    test("Number keys can input numbers", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-9").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("9");
        await wrapper.find(".b-8").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("98");
        await wrapper.find(".b-7").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("987");
        await wrapper.find(".b-6").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("9876");
        await wrapper.find(".b-5").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("98765");
        await wrapper.find(".b-4").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("987654");
        await wrapper.find(".b-3").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("9876543");
        await wrapper.find(".b-2").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("98765432");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("987654321");
        await wrapper.find(".b-0").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("9876543210");
        await wrapper.find(".b-00").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("987654321000");
    });

    test("Number keys cannot input numbers more than the upper limit", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-4").trigger("click");
        await wrapper.find(".b-5").trigger("click");
        await wrapper.find(".b-6").trigger("click");
        await wrapper.find(".b-7").trigger("click");
        await wrapper.find(".b-8").trigger("click");
        await wrapper.find(".b-9").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("123456789012");
    });

    test("AC button can reset digits to zero", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-9").trigger("click");
        await wrapper.find(".b-8").trigger("click");
        await wrapper.find(".b-7").trigger("click");
        await wrapper.find(".b-6").trigger("click");
        await wrapper.find(".b-5").trigger("click");
        await wrapper.find(".b-4").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("987654321000");
        await wrapper.find(".b-ac").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
    });

    test("Dot button can input point", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0.1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0.2");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1.2");
    });

    test("Dot button cannot input points twice", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0.1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1.2");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1.23");
    });

    test("0 button cannot input 01", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-0").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0.1");
    });

    test("00 button cannot input 001", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-00").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        await wrapper.find(".b-00").trigger("click");
        await wrapper.find(".b-dot").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0.1");
    });

    test("+/- button can switch sign", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-ss").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("-1");
        await wrapper.find(".b-ss").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
    });

    test("+ button can add numbers", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-add").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-add").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-add").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("3");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-add").trigger("click");
        await wrapper.find(".b-4").trigger("click");
        await wrapper.find(".b-add").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("7");
    });

    test("- button can subtract numbers", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-sub").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-sub").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("-1");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-sub").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("-3");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-sub").trigger("click");
        await wrapper.find(".b-4").trigger("click");
        await wrapper.find(".b-sub").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("-1");
    });

    test("x button can multiply numbers", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-mul").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-mul").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-mul").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-mul").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("6");
    });

    test("÷ button can divide numbers", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-div").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-div").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-3").trigger("click");;
        await wrapper.find(".b-div").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-div").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1.5");
    });

    test("% button can calculate remainder", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-mod").trigger("click");
        await wrapper.find(".b-5").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("5");
        await wrapper.find(".b-mod").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-5").trigger("click");
        await wrapper.find(".b-mod").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-mod").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("2");
    });

    test("= button can perform operations", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-eq").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0");
        await wrapper.find(".b-1").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-add").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-eq").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("3");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-sub").trigger("click");
        await wrapper.find(".b-4").trigger("click");
        await wrapper.find(".b-eq").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("-1");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-5").trigger("click");
        await wrapper.find(".b-mul").trigger("click");
        await wrapper.find(".b-6").trigger("click");
        await wrapper.find(".b-eq").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("30");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-7").trigger("click");
        await wrapper.find(".b-div").trigger("click");
        await wrapper.find(".b-8").trigger("click");
        await wrapper.find(".b-eq").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("0.875");
        await wrapper.find(".b-ac").trigger("click");
        await wrapper.find(".b-9").trigger("click");
        await wrapper.find(".b-mod").trigger("click");
        await wrapper.find(".b-5").trigger("click");
        await wrapper.find(".b-eq").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("4");
    });

    test("Results exceeding 12 digits are displayed with 8 significant figures", async () => {
        const wrapper = shallowMount(App, {});
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-3").trigger("click");
        await wrapper.find(".b-4").trigger("click");
        await wrapper.find(".b-5").trigger("click");
        await wrapper.find(".b-6").trigger("click");
        await wrapper.find(".b-7").trigger("click");
        await wrapper.find(".b-8").trigger("click");
        await wrapper.find(".b-9").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-2").trigger("click");
        await wrapper.find(".b-mul").trigger("click");
        await wrapper.find(".b-1").trigger("click");
        await wrapper.find(".b-0").trigger("click");
        await wrapper.find(".b-eq").trigger("click");
        expect(wrapper.find(".digits").text()).toBe("1.2345679e+12");
    });

    test("Mouseover on the screen causes message displayed", async () => {
        const wrapper = shallowMount(App, {});
        expect(wrapper.find(".subscreen").text()).toBe("");
        await wrapper.find(".digits").trigger("mouseover");
        expect(wrapper.find(".subscreen").text()).toBe("C L I C K - TO - C O P Y 😊");
    });

    test("Click on the screen causes digits copied to the clip board", async () => {
        const wrapper = shallowMount(App, {});
        expect(wrapper.find(".subscreen").text()).toBe("");
        await wrapper.find(".digits").trigger("click");
        expect(wrapper.find(".subscreen").text()).toBe("C O P I E D ❤");
    });
});

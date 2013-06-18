// modest extensions to D3 for the steward


d3.cie1931 = d3.cie1931 || {};

// https://gist.github.com/AaronH/30c50aa4b161f8169c3d
// http://www.everyhue.com/vanilla/discussion/94/rgb-to-xy-or-hue-sat-values/p1

d3.cie1931.rgb = function(x, y) {
  var r, g, b, z;

  z = 1 - (x + y);

/*
 |R|   | X |   | 3.2333         -1.5262         0.2791 |
 |G| = | Y | * |-0.8268          2.4667         0.3323 |
 |B|   | Z |   | 0.1294          0.1983         2.0280 |
 */
  r =      (x *  3.2333358361244897)  + (y * -1.5262682428425947)  + (z * 0.27916711262124544);
  g =      (x * -0.8268442148395835)  + (y *  2.466767560486707)   + (z * 0.3323241608108406);
  b =      (x *  0.12942207487871885) + (y *  0.19839858329512317) + (z * 2.0280912276039635);
  return d3.rgb (Math.max(0, Math.min(255, r * 255)), Math.max(0, Math.min(255, g * 255)), Math.max(0, Math.min(255, b * 255)));
};


d3.mired = d3.mired || {};

d3.mired.rgb = function(mireds) {
  return d3.kelvin.rgb(1000000 / mireds);
};


d3.kelvin = d3.kelvin || {};

d3.kelvin.rgb = function(kelvin) {
  var k = d3.kelvin.map[Math.round(kelvin / 100) * 100] || { rgb: '#adc1ff' };

  return d3.rgb(k.rgb);
};

// http://www.vendian.org/mncharity/dir3/blackbody/UnstableURLs/bbr_color.txt
// pruned to the essentials
d3.kelvin.map =
    { '1000': { x: 0.6499, y: 0.3474, rgb: '#ff3300' }
    , '1100': { x: 0.6361, y: 0.3594, rgb: '#ff4500' }
    , '1200': { x: 0.6226, y: 0.3703, rgb: '#ff5200' }
    , '1300': { x: 0.6095, y: 0.3801, rgb: '#ff5d00' }
    , '1400': { x: 0.5966, y: 0.3887, rgb: '#ff6600' }
    , '1500': { x: 0.5841, y: 0.3962, rgb: '#ff6f00' }
    , '1600': { x: 0.5720, y: 0.4025, rgb: '#ff7600' }
    , '1700': { x: 0.5601, y: 0.4076, rgb: '#ff7c00' }
    , '1800': { x: 0.5486, y: 0.4118, rgb: '#ff8200' }
    , '1900': { x: 0.5375, y: 0.4150, rgb: '#ff8700' }
    , '2000': { x: 0.5267, y: 0.4173, rgb: '#ff8d0b' }
    , '2100': { x: 0.5162, y: 0.4188, rgb: '#ff921d' }
    , '2200': { x: 0.5062, y: 0.4196, rgb: '#ff9829' }
    , '2300': { x: 0.4965, y: 0.4198, rgb: '#ff9d33' }
    , '2400': { x: 0.4872, y: 0.4194, rgb: '#ffa23c' }
    , '2500': { x: 0.4782, y: 0.4186, rgb: '#ffa645' }
    , '2600': { x: 0.4696, y: 0.4173, rgb: '#ffaa4d' }
    , '2700': { x: 0.4614, y: 0.4158, rgb: '#ffae54' }
    , '2800': { x: 0.4535, y: 0.4139, rgb: '#ffb25b' }
    , '2900': { x: 0.4460, y: 0.4118, rgb: '#ffb662' }
    , '3000': { x: 0.4388, y: 0.4095, rgb: '#ffb969' }
    , '3100': { x: 0.4320, y: 0.4070, rgb: '#ffbd6f' }
    , '3200': { x: 0.4254, y: 0.4044, rgb: '#ffc076' }
    , '3300': { x: 0.4192, y: 0.4018, rgb: '#ffc37c' }
    , '3400': { x: 0.4132, y: 0.3990, rgb: '#ffc682' }
    , '3500': { x: 0.4075, y: 0.3962, rgb: '#ffc987' }
    , '3600': { x: 0.4021, y: 0.3934, rgb: '#ffcb8d' }
    , '3700': { x: 0.3969, y: 0.3905, rgb: '#ffce92' }
    , '3800': { x: 0.3919, y: 0.3877, rgb: '#ffd097' }
    , '3900': { x: 0.3872, y: 0.3849, rgb: '#ffd39c' }
    , '4000': { x: 0.3827, y: 0.3820, rgb: '#ffd5a1' }
    , '4100': { x: 0.3784, y: 0.3793, rgb: '#ffd7a6' }
    , '4200': { x: 0.3743, y: 0.3765, rgb: '#ffd9ab' }
    , '4300': { x: 0.3704, y: 0.3738, rgb: '#ffdbaf' }
    , '4400': { x: 0.3666, y: 0.3711, rgb: '#ffddb4' }
    , '4500': { x: 0.3631, y: 0.3685, rgb: '#ffdfb8' }
    , '4600': { x: 0.3596, y: 0.3659, rgb: '#ffe1bc' }
    , '4700': { x: 0.3563, y: 0.3634, rgb: '#ffe2c0' }
    , '4800': { x: 0.3532, y: 0.3609, rgb: '#ffe4c4' }
    , '4900': { x: 0.3502, y: 0.3585, rgb: '#ffe5c8' }
    , '5000': { x: 0.3473, y: 0.3561, rgb: '#ffe7cc' }
    , '5100': { x: 0.3446, y: 0.3538, rgb: '#ffe8d0' }
    , '5200': { x: 0.3419, y: 0.3516, rgb: '#ffead3' }
    , '5300': { x: 0.3394, y: 0.3494, rgb: '#ffebd7' }
    , '5400': { x: 0.3369, y: 0.3472, rgb: '#ffedda' }
    , '5500': { x: 0.3346, y: 0.3451, rgb: '#ffeede' }
    , '5600': { x: 0.3323, y: 0.3431, rgb: '#ffefe1' }
    , '5700': { x: 0.3302, y: 0.3411, rgb: '#fff0e4' }
    , '5800': { x: 0.3281, y: 0.3392, rgb: '#fff1e7' }
    , '5900': { x: 0.3261, y: 0.3373, rgb: '#fff3ea' }
    , '6000': { x: 0.3242, y: 0.3355, rgb: '#fff4ed' }
    , '6100': { x: 0.3223, y: 0.3337, rgb: '#fff5f0' }
    , '6200': { x: 0.3205, y: 0.3319, rgb: '#fff6f3' }
    , '6300': { x: 0.3188, y: 0.3302, rgb: '#fff7f5' }
    , '6400': { x: 0.3171, y: 0.3286, rgb: '#fff8f8' }
    , '6500': { x: 0.3155, y: 0.3270, rgb: '#fff9fb' }
    , '6600': { x: 0.3140, y: 0.3254, rgb: '#fff9fd' }
    , '6700': { x: 0.3125, y: 0.3238, rgb: '#fefaff' }
    , '6800': { x: 0.3110, y: 0.3224, rgb: '#fcf8ff' }
    , '6900': { x: 0.3097, y: 0.3209, rgb: '#faf7ff' }
    , '7000': { x: 0.3083, y: 0.3195, rgb: '#f7f5ff' }
    , '7100': { x: 0.3070, y: 0.3181, rgb: '#f5f4ff' }
    , '7200': { x: 0.3058, y: 0.3168, rgb: '#f3f3ff' }
    , '7300': { x: 0.3045, y: 0.3154, rgb: '#f1f1ff' }
    , '7400': { x: 0.3034, y: 0.3142, rgb: '#eff0ff' }
    , '7500': { x: 0.3022, y: 0.3129, rgb: '#eeefff' }
    , '7600': { x: 0.3011, y: 0.3117, rgb: '#eceeff' }
    , '7700': { x: 0.3000, y: 0.3105, rgb: '#eaedff' }
    , '7800': { x: 0.2990, y: 0.3094, rgb: '#e9ecff' }
    , '7900': { x: 0.2980, y: 0.3082, rgb: '#e7eaff' }
    , '8000': { x: 0.2970, y: 0.3071, rgb: '#e5e9ff' }
    , '8100': { x: 0.2961, y: 0.3061, rgb: '#e4e9ff' }
    , '8200': { x: 0.2952, y: 0.3050, rgb: '#e3e8ff' }
    , '8300': { x: 0.2943, y: 0.3040, rgb: '#e1e7ff' }
    , '8400': { x: 0.2934, y: 0.3030, rgb: '#e0e6ff' }
    , '8500': { x: 0.2926, y: 0.3020, rgb: '#dfe5ff' }
    , '8600': { x: 0.2917, y: 0.3011, rgb: '#dde4ff' }
    , '8700': { x: 0.2910, y: 0.3001, rgb: '#dce3ff' }
    , '8800': { x: 0.2902, y: 0.2992, rgb: '#dbe2ff' }
    , '8900': { x: 0.2894, y: 0.2983, rgb: '#dae2ff' }
    , '9000': { x: 0.2887, y: 0.2975, rgb: '#d9e1ff' }
    , '9100': { x: 0.2880, y: 0.2966, rgb: '#d8e0ff' }
    , '9200': { x: 0.2873, y: 0.2958, rgb: '#d7dfff' }
    , '9300': { x: 0.2866, y: 0.2950, rgb: '#d6dfff' }
    , '9400': { x: 0.2860, y: 0.2942, rgb: '#d5deff' }
    , '9500': { x: 0.2853, y: 0.2934, rgb: '#d4ddff' }
    , '9600': { x: 0.2847, y: 0.2927, rgb: '#d3ddff' }
    , '9700': { x: 0.2841, y: 0.2919, rgb: '#d2dcff' }
    , '9800': { x: 0.2835, y: 0.2912, rgb: '#d1dcff' }
    , '9900': { x: 0.2829, y: 0.2905, rgb: '#d0dbff' }
    , '10000': { x: 0.2824, y: 0.2898, rgb: '#cfdaff' }
    , '10100': { x: 0.2818, y: 0.2891, rgb: '#cfdaff' }
    , '10200': { x: 0.2813, y: 0.2884, rgb: '#ced9ff' }
    , '10300': { x: 0.2807, y: 0.2878, rgb: '#cdd9ff' }
    , '10400': { x: 0.2802, y: 0.2871, rgb: '#ccd8ff' }
    , '10500': { x: 0.2797, y: 0.2865, rgb: '#ccd8ff' }
    , '10600': { x: 0.2792, y: 0.2859, rgb: '#cbd7ff' }
    , '10700': { x: 0.2788, y: 0.2853, rgb: '#cad7ff' }
    , '10800': { x: 0.2783, y: 0.2847, rgb: '#cad6ff' }
    , '10900': { x: 0.2778, y: 0.2841, rgb: '#c9d6ff' }
    , '11000': { x: 0.2774, y: 0.2836, rgb: '#c8d5ff' }
    , '11100': { x: 0.2770, y: 0.2830, rgb: '#c8d5ff' }
    , '11200': { x: 0.2765, y: 0.2825, rgb: '#c7d4ff' }
    , '11300': { x: 0.2761, y: 0.2819, rgb: '#c6d4ff' }
    , '11400': { x: 0.2757, y: 0.2814, rgb: '#c6d4ff' }
    , '11500': { x: 0.2753, y: 0.2809, rgb: '#c5d3ff' }
    , '11600': { x: 0.2749, y: 0.2804, rgb: '#c5d3ff' }
    , '11700': { x: 0.2745, y: 0.2799, rgb: '#c4d2ff' }
    , '11800': { x: 0.2742, y: 0.2794, rgb: '#c4d2ff' }
    , '11900': { x: 0.2738, y: 0.2789, rgb: '#c3d2ff' }
    , '12000': { x: 0.2734, y: 0.2785, rgb: '#c3d1ff' }
    , '12100': { x: 0.2731, y: 0.2780, rgb: '#c2d1ff' }
    , '12200': { x: 0.2727, y: 0.2776, rgb: '#c2d0ff' }
    , '12300': { x: 0.2724, y: 0.2771, rgb: '#c1d0ff' }
    , '12400': { x: 0.2721, y: 0.2767, rgb: '#c1d0ff' }
    , '12500': { x: 0.2717, y: 0.2763, rgb: '#c0cfff' }
    , '12600': { x: 0.2714, y: 0.2758, rgb: '#c0cfff' }
    , '12700': { x: 0.2711, y: 0.2754, rgb: '#bfcfff' }
    , '12800': { x: 0.2708, y: 0.2750, rgb: '#bfceff' }
    , '12900': { x: 0.2705, y: 0.2746, rgb: '#beceff' }
    , '13000': { x: 0.2702, y: 0.2742, rgb: '#beceff' }
    , '13100': { x: 0.2699, y: 0.2738, rgb: '#beceff' }
    , '13200': { x: 0.2696, y: 0.2735, rgb: '#bdcdff' }
    , '13300': { x: 0.2694, y: 0.2731, rgb: '#bdcdff' }
    , '13400': { x: 0.2691, y: 0.2727, rgb: '#bccdff' }
    , '13500': { x: 0.2688, y: 0.2724, rgb: '#bcccff' }
    , '13600': { x: 0.2686, y: 0.2720, rgb: '#bcccff' }
    , '13700': { x: 0.2683, y: 0.2717, rgb: '#bbccff' }
    , '13800': { x: 0.2680, y: 0.2713, rgb: '#bbccff' }
    , '13900': { x: 0.2678, y: 0.2710, rgb: '#bbcbff' }
    , '14000': { x: 0.2675, y: 0.2707, rgb: '#bacbff' }
    , '14100': { x: 0.2673, y: 0.2703, rgb: '#bacbff' }
    , '14200': { x: 0.2671, y: 0.2700, rgb: '#bacbff' }
    , '14300': { x: 0.2668, y: 0.2697, rgb: '#b9caff' }
    , '14400': { x: 0.2666, y: 0.2694, rgb: '#b9caff' }
    , '14500': { x: 0.2664, y: 0.2691, rgb: '#b9caff' }
    , '14600': { x: 0.2662, y: 0.2688, rgb: '#b8caff' }
    , '14700': { x: 0.2659, y: 0.2685, rgb: '#b8c9ff' }
    , '14800': { x: 0.2657, y: 0.2682, rgb: '#b8c9ff' }
    , '14900': { x: 0.2655, y: 0.2679, rgb: '#b8c9ff' }
    , '15000': { x: 0.2653, y: 0.2676, rgb: '#b7c9ff' }
    , '15100': { x: 0.2651, y: 0.2673, rgb: '#b7c9ff' }
    , '15200': { x: 0.2649, y: 0.2671, rgb: '#b7c8ff' }
    , '15300': { x: 0.2647, y: 0.2668, rgb: '#b6c8ff' }
    , '15400': { x: 0.2645, y: 0.2665, rgb: '#b6c8ff' }
    , '15500': { x: 0.2643, y: 0.2663, rgb: '#b6c8ff' }
    , '15600': { x: 0.2641, y: 0.2660, rgb: '#b6c8ff' }
    , '15700': { x: 0.2639, y: 0.2657, rgb: '#b5c7ff' }
    , '15800': { x: 0.2638, y: 0.2655, rgb: '#b5c7ff' }
    , '15900': { x: 0.2636, y: 0.2652, rgb: '#b5c7ff' }
    , '16000': { x: 0.2634, y: 0.2650, rgb: '#b5c7ff' }
    , '16100': { x: 0.2632, y: 0.2648, rgb: '#b4c7ff' }
    , '16200': { x: 0.2631, y: 0.2645, rgb: '#b4c6ff' }
    , '16300': { x: 0.2629, y: 0.2643, rgb: '#b4c6ff' }
    , '16400': { x: 0.2627, y: 0.2641, rgb: '#b4c6ff' }
    , '16500': { x: 0.2626, y: 0.2638, rgb: '#b3c6ff' }
    , '16600': { x: 0.2624, y: 0.2636, rgb: '#b3c6ff' }
    , '16700': { x: 0.2622, y: 0.2634, rgb: '#b3c6ff' }
    , '16800': { x: 0.2621, y: 0.2632, rgb: '#b3c5ff' }
    , '16900': { x: 0.2619, y: 0.2629, rgb: '#b3c5ff' }
    , '17000': { x: 0.2618, y: 0.2627, rgb: '#b2c5ff' }
    , '17100': { x: 0.2616, y: 0.2625, rgb: '#b2c5ff' }
    , '17200': { x: 0.2615, y: 0.2623, rgb: '#b2c5ff' }
    , '17300': { x: 0.2613, y: 0.2621, rgb: '#b2c5ff' }
    , '17400': { x: 0.2612, y: 0.2619, rgb: '#b2c4ff' }
    , '17500': { x: 0.2610, y: 0.2617, rgb: '#b1c4ff' }
    , '17600': { x: 0.2609, y: 0.2615, rgb: '#b1c4ff' }
    , '17700': { x: 0.2608, y: 0.2613, rgb: '#b1c4ff' }
    , '17800': { x: 0.2606, y: 0.2611, rgb: '#b1c4ff' }
    , '17900': { x: 0.2605, y: 0.2609, rgb: '#b1c4ff' }
    , '18000': { x: 0.2604, y: 0.2607, rgb: '#b0c4ff' }
    , '18100': { x: 0.2602, y: 0.2606, rgb: '#b0c3ff' }
    , '18200': { x: 0.2601, y: 0.2604, rgb: '#b0c3ff' }
    , '18300': { x: 0.2600, y: 0.2602, rgb: '#b0c3ff' }
    , '18400': { x: 0.2598, y: 0.2600, rgb: '#b0c3ff' }
    , '18500': { x: 0.2597, y: 0.2598, rgb: '#b0c3ff' }
    , '18600': { x: 0.2596, y: 0.2597, rgb: '#afc3ff' }
    , '18700': { x: 0.2595, y: 0.2595, rgb: '#afc3ff' }
    , '18800': { x: 0.2593, y: 0.2593, rgb: '#afc2ff' }
    , '18900': { x: 0.2592, y: 0.2592, rgb: '#afc2ff' }
    , '19000': { x: 0.2591, y: 0.2590, rgb: '#afc2ff' }
    , '19100': { x: 0.2590, y: 0.2588, rgb: '#afc2ff' }
    , '19200': { x: 0.2589, y: 0.2587, rgb: '#aec2ff' }
    , '19300': { x: 0.2588, y: 0.2585, rgb: '#aec2ff' }
    , '19400': { x: 0.2587, y: 0.2584, rgb: '#aec2ff' }
    , '19500': { x: 0.2586, y: 0.2582, rgb: '#aec2ff' }
    , '19600': { x: 0.2584, y: 0.2580, rgb: '#aec2ff' }
    , '19700': { x: 0.2583, y: 0.2579, rgb: '#aec1ff' }
    , '19800': { x: 0.2582, y: 0.2577, rgb: '#aec1ff' }
    , '19900': { x: 0.2581, y: 0.2576, rgb: '#adc1ff' }
    , '20000': { x: 0.2580, y: 0.2574, rgb: '#adc1ff' }
    , '20100': { x: 0.2579, y: 0.2573, rgb: '#adc1ff' }
    , '20200': { x: 0.2578, y: 0.2572, rgb: '#adc1ff' }
    , '20300': { x: 0.2577, y: 0.2570, rgb: '#adc1ff' }
    , '20400': { x: 0.2576, y: 0.2569, rgb: '#adc1ff' }
    , '20500': { x: 0.2575, y: 0.2567, rgb: '#adc1ff' }
    , '20600': { x: 0.2574, y: 0.2566, rgb: '#adc0ff' }
    , '20700': { x: 0.2573, y: 0.2565, rgb: '#acc0ff' }
    , '20800': { x: 0.2572, y: 0.2563, rgb: '#acc0ff' }
    , '20900': { x: 0.2571, y: 0.2562, rgb: '#acc0ff' }
    , '21000': { x: 0.2571, y: 0.2561, rgb: '#acc0ff' }
    , '21100': { x: 0.2570, y: 0.2559, rgb: '#acc0ff' }
    , '21200': { x: 0.2569, y: 0.2558, rgb: '#acc0ff' }
    , '21300': { x: 0.2568, y: 0.2557, rgb: '#acc0ff' }
    , '21400': { x: 0.2567, y: 0.2555, rgb: '#acc0ff' }
    , '21500': { x: 0.2566, y: 0.2554, rgb: '#abc0ff' }
    , '21600': { x: 0.2565, y: 0.2553, rgb: '#abc0ff' }
    , '21700': { x: 0.2564, y: 0.2552, rgb: '#abbfff' }
    , '21800': { x: 0.2564, y: 0.2550, rgb: '#abbfff' }
    , '21900': { x: 0.2563, y: 0.2549, rgb: '#abbfff' }
    , '22000': { x: 0.2562, y: 0.2548, rgb: '#abbfff' }
    , '22100': { x: 0.2561, y: 0.2547, rgb: '#abbfff' }
    , '22200': { x: 0.2560, y: 0.2546, rgb: '#abbfff' }
    , '22300': { x: 0.2559, y: 0.2545, rgb: '#abbfff' }
    , '22400': { x: 0.2559, y: 0.2543, rgb: '#aabfff' }
    , '22500': { x: 0.2558, y: 0.2542, rgb: '#aabfff' }
    , '22600': { x: 0.2557, y: 0.2541, rgb: '#aabfff' }
    , '22700': { x: 0.2556, y: 0.2540, rgb: '#aabfff' }
    , '22800': { x: 0.2556, y: 0.2539, rgb: '#aabeff' }
    , '22900': { x: 0.2555, y: 0.2538, rgb: '#aabeff' }
    , '23000': { x: 0.2554, y: 0.2537, rgb: '#aabeff' }
    , '23100': { x: 0.2553, y: 0.2536, rgb: '#aabeff' }
    , '23200': { x: 0.2553, y: 0.2535, rgb: '#aabeff' }
    , '23300': { x: 0.2552, y: 0.2534, rgb: '#aabeff' }
    , '23400': { x: 0.2551, y: 0.2533, rgb: '#a9beff' }
    , '23500': { x: 0.2551, y: 0.2532, rgb: '#a9beff' }
    , '23600': { x: 0.2550, y: 0.2531, rgb: '#a9beff' }
    , '23700': { x: 0.2549, y: 0.2530, rgb: '#a9beff' }
    , '23800': { x: 0.2548, y: 0.2529, rgb: '#a9beff' }
    , '23900': { x: 0.2548, y: 0.2528, rgb: '#a9beff' }
    , '24000': { x: 0.2547, y: 0.2527, rgb: '#a9beff' }
    , '24100': { x: 0.2546, y: 0.2526, rgb: '#a9beff' }
    , '24200': { x: 0.2546, y: 0.2525, rgb: '#a9bdff' }
    , '24300': { x: 0.2545, y: 0.2524, rgb: '#a9bdff' }
    , '24400': { x: 0.2544, y: 0.2523, rgb: '#a9bdff' }
    , '24500': { x: 0.2544, y: 0.2522, rgb: '#a8bdff' }
    , '24600': { x: 0.2543, y: 0.2521, rgb: '#a8bdff' }
    , '24700': { x: 0.2543, y: 0.2520, rgb: '#a8bdff' }
    , '24800': { x: 0.2542, y: 0.2519, rgb: '#a8bdff' }
    , '24900': { x: 0.2541, y: 0.2518, rgb: '#a8bdff' }
    , '25000': { x: 0.2541, y: 0.2517, rgb: '#a8bdff' }
    , '25100': { x: 0.2540, y: 0.2516, rgb: '#a8bdff' }
    , '25200': { x: 0.2540, y: 0.2516, rgb: '#a8bdff' }
    , '25300': { x: 0.2539, y: 0.2515, rgb: '#a8bdff' }
    , '25400': { x: 0.2538, y: 0.2514, rgb: '#a8bdff' }
    , '25500': { x: 0.2538, y: 0.2513, rgb: '#a8bdff' }
    , '25600': { x: 0.2537, y: 0.2512, rgb: '#a8bdff' }
    , '25700': { x: 0.2537, y: 0.2511, rgb: '#a7bcff' }
    , '25800': { x: 0.2536, y: 0.2511, rgb: '#a7bcff' }
    , '25900': { x: 0.2535, y: 0.2510, rgb: '#a7bcff' }
    , '26000': { x: 0.2535, y: 0.2509, rgb: '#a7bcff' }
    , '26100': { x: 0.2534, y: 0.2508, rgb: '#a7bcff' }
    , '26200': { x: 0.2534, y: 0.2507, rgb: '#a7bcff' }
    , '26300': { x: 0.2533, y: 0.2507, rgb: '#a7bcff' }
    , '26400': { x: 0.2533, y: 0.2506, rgb: '#a7bcff' }
    , '26500': { x: 0.2532, y: 0.2505, rgb: '#a7bcff' }
    , '26600': { x: 0.2532, y: 0.2504, rgb: '#a7bcff' }
    , '26700': { x: 0.2531, y: 0.2503, rgb: '#a7bcff' }
    , '26800': { x: 0.2531, y: 0.2503, rgb: '#a7bcff' }
    , '26900': { x: 0.2530, y: 0.2502, rgb: '#a7bcff' }
    , '27000': { x: 0.2530, y: 0.2501, rgb: '#a7bcff' }
    , '27100': { x: 0.2529, y: 0.2500, rgb: '#a6bcff' }
    , '27200': { x: 0.2529, y: 0.2500, rgb: '#a6bcff' }
    , '27300': { x: 0.2528, y: 0.2499, rgb: '#a6bcff' }
    , '27400': { x: 0.2528, y: 0.2498, rgb: '#a6bbff' }
    , '27500': { x: 0.2527, y: 0.2497, rgb: '#a6bbff' }
    , '27600': { x: 0.2527, y: 0.2497, rgb: '#a6bbff' }
    , '27700': { x: 0.2526, y: 0.2496, rgb: '#a6bbff' }
    , '27800': { x: 0.2526, y: 0.2495, rgb: '#a6bbff' }
    , '27900': { x: 0.2525, y: 0.2495, rgb: '#a6bbff' }
    , '28000': { x: 0.2525, y: 0.2494, rgb: '#a6bbff' }
    , '28100': { x: 0.2524, y: 0.2493, rgb: '#a6bbff' }
    , '28200': { x: 0.2524, y: 0.2493, rgb: '#a6bbff' }
    , '28300': { x: 0.2523, y: 0.2492, rgb: '#a6bbff' }
    , '28400': { x: 0.2523, y: 0.2491, rgb: '#a6bbff' }
    , '28500': { x: 0.2523, y: 0.2491, rgb: '#a6bbff' }
    , '28600': { x: 0.2522, y: 0.2490, rgb: '#a6bbff' }
    , '28700': { x: 0.2522, y: 0.2489, rgb: '#a5bbff' }
    , '28800': { x: 0.2521, y: 0.2489, rgb: '#a5bbff' }
    , '28900': { x: 0.2521, y: 0.2488, rgb: '#a5bbff' }
    , '29000': { x: 0.2520, y: 0.2487, rgb: '#a5bbff' }
    , '29100': { x: 0.2520, y: 0.2487, rgb: '#a5bbff' }
    , '29200': { x: 0.2519, y: 0.2486, rgb: '#a5bbff' }
    , '29300': { x: 0.2519, y: 0.2485, rgb: '#a5bbff' }
    , '29400': { x: 0.2519, y: 0.2485, rgb: '#a5bbff' }
    , '29500': { x: 0.2518, y: 0.2484, rgb: '#a5baff' }
    , '29600': { x: 0.2518, y: 0.2484, rgb: '#a5baff' }
    , '29700': { x: 0.2517, y: 0.2483, rgb: '#a5baff' }
    , '29800': { x: 0.2517, y: 0.2482, rgb: '#a5baff' }
    , '29900': { x: 0.2517, y: 0.2482, rgb: '#a5baff' }
    , '30000': { x: 0.2516, y: 0.2481, rgb: '#a5baff' }
    , '30100': { x: 0.2516, y: 0.2481, rgb: '#a5baff' }
    , '30200': { x: 0.2515, y: 0.2480, rgb: '#a5baff' }
    , '30300': { x: 0.2515, y: 0.2480, rgb: '#a5baff' }
    , '30400': { x: 0.2515, y: 0.2479, rgb: '#a5baff' }
    , '30500': { x: 0.2514, y: 0.2478, rgb: '#a5baff' }
    , '30600': { x: 0.2514, y: 0.2478, rgb: '#a4baff' }
    , '30700': { x: 0.2513, y: 0.2477, rgb: '#a4baff' }
    , '30800': { x: 0.2513, y: 0.2477, rgb: '#a4baff' }
    , '30900': { x: 0.2513, y: 0.2476, rgb: '#a4baff' }
    , '31000': { x: 0.2512, y: 0.2476, rgb: '#a4baff' }
    , '31100': { x: 0.2512, y: 0.2475, rgb: '#a4baff' }
    , '31200': { x: 0.2512, y: 0.2474, rgb: '#a4baff' }
    , '31300': { x: 0.2511, y: 0.2474, rgb: '#a4baff' }
    , '31400': { x: 0.2511, y: 0.2473, rgb: '#a4baff' }
    , '31500': { x: 0.2511, y: 0.2473, rgb: '#a4baff' }
    , '31600': { x: 0.2510, y: 0.2472, rgb: '#a4baff' }
    , '31700': { x: 0.2510, y: 0.2472, rgb: '#a4baff' }
    , '31800': { x: 0.2509, y: 0.2471, rgb: '#a4baff' }
    , '31900': { x: 0.2509, y: 0.2471, rgb: '#a4baff' }
    , '32000': { x: 0.2509, y: 0.2470, rgb: '#a4b9ff' }
    , '32100': { x: 0.2508, y: 0.2470, rgb: '#a4b9ff' }
    , '32200': { x: 0.2508, y: 0.2469, rgb: '#a4b9ff' }
    , '32300': { x: 0.2508, y: 0.2469, rgb: '#a4b9ff' }
    , '32400': { x: 0.2507, y: 0.2468, rgb: '#a4b9ff' }
    , '32500': { x: 0.2507, y: 0.2468, rgb: '#a4b9ff' }
    , '32600': { x: 0.2507, y: 0.2467, rgb: '#a4b9ff' }
    , '32700': { x: 0.2506, y: 0.2467, rgb: '#a3b9ff' }
    , '32800': { x: 0.2506, y: 0.2466, rgb: '#a3b9ff' }
    , '32900': { x: 0.2506, y: 0.2466, rgb: '#a3b9ff' }
    , '33000': { x: 0.2505, y: 0.2465, rgb: '#a3b9ff' }
    , '33100': { x: 0.2505, y: 0.2465, rgb: '#a3b9ff' }
    , '33200': { x: 0.2505, y: 0.2464, rgb: '#a3b9ff' }
    , '33300': { x: 0.2505, y: 0.2464, rgb: '#a3b9ff' }
    , '33400': { x: 0.2504, y: 0.2463, rgb: '#a3b9ff' }
    , '33500': { x: 0.2504, y: 0.2463, rgb: '#a3b9ff' }
    , '33600': { x: 0.2504, y: 0.2463, rgb: '#a3b9ff' }
    , '33700': { x: 0.2503, y: 0.2462, rgb: '#a3b9ff' }
    , '33800': { x: 0.2503, y: 0.2462, rgb: '#a3b9ff' }
    , '33900': { x: 0.2503, y: 0.2461, rgb: '#a3b9ff' }
    , '34000': { x: 0.2502, y: 0.2461, rgb: '#a3b9ff' }
    , '34100': { x: 0.2502, y: 0.2460, rgb: '#a3b9ff' }
    , '34200': { x: 0.2502, y: 0.2460, rgb: '#a3b9ff' }
    , '34300': { x: 0.2502, y: 0.2459, rgb: '#a3b9ff' }
    , '34400': { x: 0.2501, y: 0.2459, rgb: '#a3b9ff' }
    , '34500': { x: 0.2501, y: 0.2459, rgb: '#a3b9ff' }
    , '34600': { x: 0.2501, y: 0.2458, rgb: '#a3b9ff' }
    , '34700': { x: 0.2500, y: 0.2458, rgb: '#a3b9ff' }
    , '34800': { x: 0.2500, y: 0.2457, rgb: '#a3b9ff' }
    , '34900': { x: 0.2500, y: 0.2457, rgb: '#a3b9ff' }
    , '35000': { x: 0.2500, y: 0.2456, rgb: '#a3b8ff' }
    , '35100': { x: 0.2499, y: 0.2456, rgb: '#a3b8ff' }
    , '35200': { x: 0.2499, y: 0.2456, rgb: '#a2b8ff' }
    , '35300': { x: 0.2499, y: 0.2455, rgb: '#a2b8ff' }
    , '35400': { x: 0.2498, y: 0.2455, rgb: '#a2b8ff' }
    , '35500': { x: 0.2498, y: 0.2454, rgb: '#a2b8ff' }
    , '35600': { x: 0.2498, y: 0.2454, rgb: '#a2b8ff' }
    , '35700': { x: 0.2498, y: 0.2454, rgb: '#a2b8ff' }
    , '35800': { x: 0.2497, y: 0.2453, rgb: '#a2b8ff' }
    , '35900': { x: 0.2497, y: 0.2453, rgb: '#a2b8ff' }
    , '36000': { x: 0.2497, y: 0.2452, rgb: '#a2b8ff' }
    , '36100': { x: 0.2497, y: 0.2452, rgb: '#a2b8ff' }
    , '36200': { x: 0.2496, y: 0.2452, rgb: '#a2b8ff' }
    , '36300': { x: 0.2496, y: 0.2451, rgb: '#a2b8ff' }
    , '36400': { x: 0.2496, y: 0.2451, rgb: '#a2b8ff' }
    , '36500': { x: 0.2496, y: 0.2450, rgb: '#a2b8ff' }
    , '36600': { x: 0.2495, y: 0.2450, rgb: '#a2b8ff' }
    , '36700': { x: 0.2495, y: 0.2450, rgb: '#a2b8ff' }
    , '36800': { x: 0.2495, y: 0.2449, rgb: '#a2b8ff' }
    , '36900': { x: 0.2495, y: 0.2449, rgb: '#a2b8ff' }
    , '37000': { x: 0.2494, y: 0.2449, rgb: '#a2b8ff' }
    , '37100': { x: 0.2494, y: 0.2448, rgb: '#a2b8ff' }
    , '37200': { x: 0.2494, y: 0.2448, rgb: '#a2b8ff' }
    , '37300': { x: 0.2494, y: 0.2447, rgb: '#a2b8ff' }
    , '37400': { x: 0.2493, y: 0.2447, rgb: '#a2b8ff' }
    , '37500': { x: 0.2493, y: 0.2447, rgb: '#a2b8ff' }
    , '37600': { x: 0.2493, y: 0.2446, rgb: '#a2b8ff' }
    , '37700': { x: 0.2493, y: 0.2446, rgb: '#a2b8ff' }
    , '37800': { x: 0.2492, y: 0.2446, rgb: '#a2b8ff' }
    , '37900': { x: 0.2492, y: 0.2445, rgb: '#a2b8ff' }
    , '38000': { x: 0.2492, y: 0.2445, rgb: '#a2b8ff' }
    , '38100': { x: 0.2492, y: 0.2445, rgb: '#a2b8ff' }
    , '38200': { x: 0.2491, y: 0.2444, rgb: '#a2b8ff' }
    , '38300': { x: 0.2491, y: 0.2444, rgb: '#a1b8ff' }
    , '38400': { x: 0.2491, y: 0.2444, rgb: '#a1b8ff' }
    , '38500': { x: 0.2491, y: 0.2443, rgb: '#a1b8ff' }
    , '38600': { x: 0.2491, y: 0.2443, rgb: '#a1b7ff' }
    , '38700': { x: 0.2490, y: 0.2443, rgb: '#a1b7ff' }
    , '38800': { x: 0.2490, y: 0.2442, rgb: '#a1b7ff' }
    , '38900': { x: 0.2490, y: 0.2442, rgb: '#a1b7ff' }
    , '39000': { x: 0.2490, y: 0.2442, rgb: '#a1b7ff' }
    , '39100': { x: 0.2489, y: 0.2441, rgb: '#a1b7ff' }
    , '39200': { x: 0.2489, y: 0.2441, rgb: '#a1b7ff' }
    , '39300': { x: 0.2489, y: 0.2441, rgb: '#a1b7ff' }
    , '39400': { x: 0.2489, y: 0.2440, rgb: '#a1b7ff' }
    , '39500': { x: 0.2489, y: 0.2440, rgb: '#a1b7ff' }
    , '39600': { x: 0.2488, y: 0.2440, rgb: '#a1b7ff' }
    , '39700': { x: 0.2488, y: 0.2439, rgb: '#a1b7ff' }
    , '39800': { x: 0.2488, y: 0.2439, rgb: '#a1b7ff' }
    , '39900': { x: 0.2488, y: 0.2439, rgb: '#a1b7ff' }
    , '40000': { x: 0.2487, y: 0.2438, rgb: '#a1b7ff' }
    };

// derived from http://voices.yahoo.com/the-color-temperature-lighting-conditions-the-8449595.html

d3.kelvin.solar = d3.kelvin.solar ||
    { dawn               : d3.kelvin.rgb(1000)
    , 'morning-twilight' : d3.kelvin.rgb(2000)
    , sunrise            : d3.kelvin.rgb(10000)
    , morning            : d3.kelvin.rgb(3500)
    , daylight           : d3.kelvin.rgb(5000)
    , noon               : d3.kelvin.rgb(5500)
    , evening            : d3.kelvin.rgb(4000)
    , sunset             : d3.kelvin.rgb(2500)
    , 'evening-twilight' : d3.kelvin.rgb(10000)
    , dusk               : d3.kelvin.rgb(10000)
    , night              : d3.kelvin.rgb(1500)
    , nadir              : 'black'
    };


d3.rgb.status = d3.rgb.status ||
    { absent      : 'red'
    , connected   : 'lightblue'
    , idle        : 'yellow'
    , motion      : 'yellow'
    , off         : 'lightcyan'
    , on          : 'lightgreen'
    , paired      : 'lightblue'
    , present     : 'lightblue'
    , quiet       : 'lightblue'
    , ready       : 'lightblue'
    , refreshing  : 'cyan'
    , unknown     : 'black'
    , unpaired    : 'red'
    , unreachable : 'red'
    , waiting     : 'yellow'
    };


d3.rainbow = d3.rainbow || [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ];

d3.timestamp = d3.timestamp || {};

// http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
d3.timestamp.ago = function(time, agoP) {
  if (!time) return '';
  switch (typeof time) {
    case 'number':
      break;

    case 'string':
      time = +new Date(time);
      break;

    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;

    default:
      time = +new Date();
      break;
  }
  var time_formats = [
    [         60, 's'      ,                   1], // 60
    [        120, '1m',            '1m from now'], // 60*2
    [       3600, 'm',                        60], // 60*60, 60
    [       7200, '1h',            '1h from now'], // 60*60*2
    [      86400, 'h',                      3600], // 60*60*24, 60*60
    [     172800, 'yesterday',        'tomorrow'], // 60*60*24*2
    [     604800, 'd',                     86400], // 60*60*24*7, 60*60*24
    [    1209600, 'last week',       'next week'], // 60*60*24*7*4*2
    [    2419200, 'w',                    604800], // 60*60*24*7*4, 60*60*24*7
    [    4838400, 'last month',     'next month'], // 60*60*24*7*4*2
    [   29030400, 'months',              2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [   58060800, 'last year',       'next year'], // 60*60*24*7*4*12*2
    [ 2903040000, 'years',              29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [ 5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries',        2903040000]  // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000
    , token = agoP ? 'ago' : ''
    , list_choice = 1;

  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  } else if (seconds < 1) {
    return 'now';
  }

  var i = 0
    , format;
  while (!!(format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == 'string') return format[list_choice];
      return Math.floor(seconds / format[2]) + format[1] + ' ' + token;
    }
  return time;
};

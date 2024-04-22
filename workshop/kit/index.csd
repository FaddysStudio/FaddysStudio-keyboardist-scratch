<CsoundSynthesizer>

<CsOptions>

;-m0
-odac

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

i_ system_i 1, "clear"

#include "../orc/keyboard.part"
#include "sampler.part"
#include "sample.part"

</CsInstruments>

<CsScore>
</CsScore>

</CsoundSynthesizer>

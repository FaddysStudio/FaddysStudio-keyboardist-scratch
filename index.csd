<CsoundSynthesizer>

<CsOptions>

;;-m0
-odac

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

#include "engine/process.part"
#include "engine/keyboard.part"
#include "engine/synthesizer.part"

instr out

aLeft chnget "left"
aRight chnget "right"

outs aLeft, aRight

chnclear "left"
chnclear "right"

endin

schedule "out", 0, -1

</CsInstruments>

<CsScore>
</CsScore>

</CsoundSynthesizer>

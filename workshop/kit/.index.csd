<CsoundSynthesizer>

<CsOptions>

-m0
-odac

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1

SSample strget p4
p3 filelen SSample

iChannels filenchnls SSample

if iChannels == 1 then

aLeft diskin2 SSample
aRight = aLeft

else

aLeft, aRight diskin2 SSample

endif

outs aLeft, aRight

endin

</CsInstruments>

<CsScore>

#ifdef sample

i 1 0 1 "$sample"

#end

e

</CsScore>

</CsoundSynthesizer>

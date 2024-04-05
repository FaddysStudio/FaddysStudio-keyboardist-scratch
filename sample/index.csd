<CsoundSynthesizer>

<CsOptions>

-m0
-n

</CsOptions>

<CsInstruments>

#ifdef sample

iDuration filelen "$sample"

SOutput sprintf "echo %f", iDuration

i_ system_i 1, SOutput

#end

exitnow

</CsInstruments>

<CsScore>
</CsScore>

</CsoundSynthesizer>

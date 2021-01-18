package br.com.beplan.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.beplan.web.rest.TestUtil;

public class TipsterTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tipster.class);
        Tipster tipster1 = new Tipster();
        tipster1.setId(1L);
        Tipster tipster2 = new Tipster();
        tipster2.setId(tipster1.getId());
        assertThat(tipster1).isEqualTo(tipster2);
        tipster2.setId(2L);
        assertThat(tipster1).isNotEqualTo(tipster2);
        tipster1.setId(null);
        assertThat(tipster1).isNotEqualTo(tipster2);
    }
}
